import fs from "node:fs/promises";
import path from "node:path";

const REQUIRED_PATTERNS = {
	direct: /(^|\n)(Short answer:|Direct answer)/i,
	deep: /(^|\n)Deep answer:/i,
	mistakes: /(^|\n)(Common mistakes and red flags:|Common mistakes:|Anti-pattern answer:)/i,
	followUp: /(^|\n)(Follow-up ladder:|Follow-up variants:)/i,
	code: /(^|\n)(Sample code or pseudocode \(when relevant\):|Sample code or pseudocode:|Sample code:)/i
};

async function walkMarkdownFiles(dirPath) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkMarkdownFiles(fullPath)));
			continue;
		}

		if (entry.isFile() && entry.name.endsWith(".md") && fullPath.includes(`${path.sep}interviews${path.sep}`)) {
			files.push(fullPath);
		}
	}

	return files;
}

function parseQuestions(markdown) {
	const questionRegex = /^###\s+(Q\d+:[^\n]*)/gm;
	const matches = [...markdown.matchAll(questionRegex)];
	const questions = [];

	for (let index = 0; index < matches.length; index += 1) {
		const current = matches[index];
		const next = matches[index + 1];
		const start = current.index ?? 0;
		const end = next?.index ?? markdown.length;
		const block = markdown.slice(start, end);

		questions.push({
			title: current[1].trim(),
			block
		});
	}

	return questions;
}

function evaluateQuestion(question) {
	return {
		title: question.title,
		hasDirect: REQUIRED_PATTERNS.direct.test(question.block),
		hasDeep: REQUIRED_PATTERNS.deep.test(question.block),
		hasMistakes: REQUIRED_PATTERNS.mistakes.test(question.block),
		hasFollowUp: REQUIRED_PATTERNS.followUp.test(question.block),
		hasCode: REQUIRED_PATTERNS.code.test(question.block)
	};
}

function summarizeFile(filePath, questions) {
	const checks = questions.map(evaluateQuestion);
	const counts = {
		total: checks.length,
		direct: checks.filter((item) => item.hasDirect).length,
		deep: checks.filter((item) => item.hasDeep).length,
		mistakes: checks.filter((item) => item.hasMistakes).length,
		followUp: checks.filter((item) => item.hasFollowUp).length,
		code: checks.filter((item) => item.hasCode).length
	};

	const missing = checks.filter(
		(item) => !item.hasDirect || !item.hasDeep || !item.hasMistakes || !item.hasFollowUp || !item.hasCode
	);

	return {
		filePath,
		counts,
		missing
	};
}

function formatPercent(numerator, denominator) {
	if (!denominator) {
		return "0.0";
	}
	return ((numerator / denominator) * 100).toFixed(1);
}

function buildReport(rootPath, summaries) {
	const generatedAt = new Date().toISOString();
	const totals = summaries.reduce(
		(acc, summary) => {
			acc.questions += summary.counts.total;
			acc.direct += summary.counts.direct;
			acc.deep += summary.counts.deep;
			acc.mistakes += summary.counts.mistakes;
			acc.followUp += summary.counts.followUp;
			acc.code += summary.counts.code;
			return acc;
		},
		{ questions: 0, direct: 0, deep: 0, mistakes: 0, followUp: 0, code: 0 }
	);

	const lines = [];
	lines.push("# Interview Coverage Report");
	lines.push("");
	lines.push(`Generated: ${generatedAt}`);
	lines.push("");
	lines.push("## Global Coverage");
	lines.push(`- Total questions: ${totals.questions}`);
	lines.push(`- Direct answer coverage: ${totals.direct}/${totals.questions} (${formatPercent(totals.direct, totals.questions)}%)`);
	lines.push(`- Deep answer coverage: ${totals.deep}/${totals.questions} (${formatPercent(totals.deep, totals.questions)}%)`);
	lines.push(`- Mistakes coverage: ${totals.mistakes}/${totals.questions} (${formatPercent(totals.mistakes, totals.questions)}%)`);
	lines.push(`- Follow-up coverage: ${totals.followUp}/${totals.questions} (${formatPercent(totals.followUp, totals.questions)}%)`);
	lines.push(`- Code/pseudocode coverage: ${totals.code}/${totals.questions} (${formatPercent(totals.code, totals.questions)}%)`);
	lines.push("");
	lines.push("## Per File");
	lines.push("| File | Total | Direct | Deep | Mistakes | Follow-up | Code | Missing blocks |\n| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |");

	for (const summary of summaries) {
		const relative = path.relative(rootPath, summary.filePath).split(path.sep).join("/");
		lines.push(
			`| ${relative} | ${summary.counts.total} | ${summary.counts.direct} | ${summary.counts.deep} | ${summary.counts.mistakes} | ${summary.counts.followUp} | ${summary.counts.code} | ${summary.missing.length} |`
		);
	}

	lines.push("");
	lines.push("## Missing Details");
	for (const summary of summaries) {
		if (!summary.missing.length) {
			continue;
		}

		const relative = path.relative(rootPath, summary.filePath).split(path.sep).join("/");
		lines.push("");
		lines.push(`### ${relative}`);
		for (const question of summary.missing) {
			const missingBlocks = [];
			if (!question.hasDirect) missingBlocks.push("Direct");
			if (!question.hasDeep) missingBlocks.push("Deep");
			if (!question.hasMistakes) missingBlocks.push("Mistakes");
			if (!question.hasFollowUp) missingBlocks.push("Follow-up");
			if (!question.hasCode) missingBlocks.push("Code");
			lines.push(`- ${question.title}: missing ${missingBlocks.join(", ")}`);
		}
	}

	lines.push("");
	return `${lines.join("\n")}\n`;
}

async function main() {
	const repoRoot = path.resolve(process.cwd());
	const interviewsRoot = path.join(repoRoot, "library", "core");
	const outputPath = path.join(repoRoot, "library", "_meta", "interview-coverage-report.md");

	const interviewFiles = await walkMarkdownFiles(interviewsRoot);
	const summaries = [];

	for (const filePath of interviewFiles) {
		const markdown = await fs.readFile(filePath, "utf8");
		const questions = parseQuestions(markdown);
		summaries.push(summarizeFile(filePath, questions));
	}

	summaries.sort((a, b) => a.filePath.localeCompare(b.filePath));
	const report = buildReport(repoRoot, summaries);

	await fs.writeFile(outputPath, report, "utf8");
	console.log(`Wrote coverage report: ${outputPath}`);
}

main().catch((error) => {
	console.error("Interview coverage check failed", error);
	process.exit(1);
});
