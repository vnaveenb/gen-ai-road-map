import fs from "node:fs/promises";
import path from "node:path";

const QUESTION_REGEX = /^###\s+(Q\d+:[^\n]*)/gm;

function parseArgs() {
	const args = process.argv.slice(2);
	const options = {
		targets: []
	};

	for (const arg of args) {
		if (arg.startsWith("--target=")) {
			const raw = arg.slice("--target=".length).trim();
			if (raw) {
				options.targets.push(raw);
			}
		}
	}

	return options;
}

async function walkInterviewFiles(dirPath) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkInterviewFiles(fullPath)));
			continue;
		}

		if (entry.isFile() && entry.name.endsWith(".md") && fullPath.includes(`${path.sep}interviews${path.sep}`)) {
			files.push(fullPath);
		}
	}

	return files;
}

function buildDirectAnswer(topic) {
	return `Direct answer:\nUse a clear, constraint-first decision for ${topic.toLowerCase()}, then state one production tradeoff (latency, cost, or reliability).`;
}

function buildDeepAnswer() {
	return [
		"Deep answer:",
		"1. State assumptions, constraints, and success metric.",
		"2. Explain the chosen design or algorithm and why alternatives are weaker.",
		"3. Cover failure handling, observability, and rollback criteria."
	].join("\n");
}

function buildMistakes() {
	return [
		"Common mistakes and red flags:",
		"- Naming tools or algorithms without mapping them to constraints.",
		"- Ignoring edge cases, failure modes, or rollback triggers.",
		"- Skipping metrics needed to prove the design works in production."
	].join("\n");
}

function buildFollowups() {
	return [
		"Follow-up variants:",
		"- What changes if throughput doubles or latency budget is cut in half?",
		"- Which single metric would trigger rollback after deployment?"
	].join("\n");
}

function buildCodeTemplate() {
	return [
		"Sample code or pseudocode (when relevant):",
		"```text",
		"# Interview outline",
		"1) Validate inputs and constraints",
		"2) Apply core strategy",
		"3) Add failure handling and observability hooks",
		"```"
	].join("\n");
}

function normalizeLabels(block) {
	return block
		.replace(/^Short answer:/gm, "Direct answer:")
		.replace(/^Follow-up ladder:/gm, "Follow-up variants:")
		.replace(/^Anti-pattern answer:/gm, "Common mistakes and red flags:");
}

function hasSection(block, pattern) {
	return pattern.test(block);
}

function ensureSections(questionTitle, block) {
	let normalized = normalizeLabels(block).trimEnd();
	const sectionChecks = {
		direct: /(^|\n)Direct answer:/i,
		deep: /(^|\n)Deep answer:/i,
		mistakes: /(^|\n)(Common mistakes and red flags:|Common mistakes:)/i,
		followUp: /(^|\n)Follow-up variants:/i,
		code: /(^|\n)(Sample code or pseudocode \(when relevant\):|Sample code or pseudocode:|Sample code:)/i
	};

	const blocksToAppend = [];
	if (!hasSection(normalized, sectionChecks.direct)) {
		blocksToAppend.push(buildDirectAnswer(questionTitle));
	}
	if (!hasSection(normalized, sectionChecks.deep)) {
		blocksToAppend.push(buildDeepAnswer());
	}
	if (!hasSection(normalized, sectionChecks.mistakes)) {
		blocksToAppend.push(buildMistakes());
	}
	if (!hasSection(normalized, sectionChecks.followUp)) {
		blocksToAppend.push(buildFollowups());
	}
	if (!hasSection(normalized, sectionChecks.code)) {
		blocksToAppend.push(buildCodeTemplate());
	}

	if (blocksToAppend.length) {
		normalized = `${normalized}\n\n${blocksToAppend.join("\n\n")}`;
	}

	return `${normalized}\n`;
}

function normalizeInterviewMarkdown(markdown) {
	const matches = [...markdown.matchAll(QUESTION_REGEX)];
	if (!matches.length) {
		return markdown;
	}

	let output = "";
	let cursor = 0;

	for (let index = 0; index < matches.length; index += 1) {
		const current = matches[index];
		const next = matches[index + 1];
		const start = current.index ?? 0;
		const end = next?.index ?? markdown.length;
		const title = current[1].trim();
		const questionTopic = title.split(":").slice(1).join(":").trim() || title;

		output += markdown.slice(cursor, start);
		output += ensureSections(questionTopic, markdown.slice(start, end));
		cursor = end;
	}

	if (cursor < markdown.length) {
		output += markdown.slice(cursor);
	}

	return output;
}

function shouldProcessFile(filePath, targets) {
	if (!targets.length) {
		return true;
	}

	const normalized = filePath.split(path.sep).join("/");
	return targets.some((target) => normalized.includes(target));
}

async function main() {
	const options = parseArgs();
	const repoRoot = path.resolve(process.cwd());
	const interviewRoot = path.join(repoRoot, "library", "core");

	const files = await walkInterviewFiles(interviewRoot);
	let updatedCount = 0;

	for (const filePath of files) {
		if (!shouldProcessFile(filePath, options.targets)) {
			continue;
		}

		const original = await fs.readFile(filePath, "utf8");
		const normalized = normalizeInterviewMarkdown(original);

		if (normalized !== original) {
			await fs.writeFile(filePath, normalized, "utf8");
			updatedCount += 1;
			console.log(`Updated interview format: ${filePath}`);
		}
	}

	console.log(`Interview format update complete. Files updated: ${updatedCount}`);
}

main().catch((error) => {
	console.error("Failed to normalize interview format", error);
	process.exit(1);
});
