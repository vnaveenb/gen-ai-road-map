import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";

const REQUIRED_PATTERNS = {
direct: /(^|\n)(Short answer:|Direct answer)/i,
deep: /(^|\n)Deep answer:/i,
mistakes: /(^|\n)(Common mistakes and red flags:|Common mistakes:|Anti-pattern answer:)/i,
followUp: /(^|\n)(Follow-up ladder:|Follow-up variants:)/i,
code: /(^|\n)(Sample code or pseudocode \(when relevant\):|Sample code or pseudocode:|Sample code:)/i
};

function parseArgs() {
const args = process.argv.slice(2);
const options = {
enforceBaseline: false,
reportPath: null,
summaryPath: null,
baselinePath: null
};

for (const arg of args) {
if (arg === "--enforce-baseline") {
options.enforceBaseline = true;
continue;
}

if (arg.startsWith("--report=")) {
options.reportPath = arg.slice("--report=".length).trim();
continue;
}

if (arg.startsWith("--summary=")) {
options.summaryPath = arg.slice("--summary=".length).trim();
continue;
}

if (arg.startsWith("--baseline=")) {
options.baselinePath = arg.slice("--baseline=".length).trim();
}
}

return options;
}

function resolveRepoRoot(startDir) {
const candidates = [
startDir,
path.resolve(startDir, ".."),
path.resolve(startDir, "../..")
];

for (const candidate of candidates) {
const corePath = path.join(candidate, "library", "core");
if (fsSync.existsSync(corePath)) {
return candidate;
}
}

throw new Error("Could not resolve repository root containing library/core");
}

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

function computeTotals(summaries) {
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

return {
counts: totals,
percent: {
direct: Number(formatPercent(totals.direct, totals.questions)),
deep: Number(formatPercent(totals.deep, totals.questions)),
mistakes: Number(formatPercent(totals.mistakes, totals.questions)),
followUp: Number(formatPercent(totals.followUp, totals.questions)),
code: Number(formatPercent(totals.code, totals.questions))
}
};
}

function buildReport(rootPath, summaries, totals) {
const generatedAt = new Date().toISOString();

const lines = [];
lines.push("# Interview Coverage Report");
lines.push("");
lines.push(`Generated: ${generatedAt}`);
lines.push("");
lines.push("## Global Coverage");
lines.push(`- Total questions: ${totals.counts.questions}`);
lines.push(`- Direct answer coverage: ${totals.counts.direct}/${totals.counts.questions} (${formatPercent(totals.counts.direct, totals.counts.questions)}%)`);
lines.push(`- Deep answer coverage: ${totals.counts.deep}/${totals.counts.questions} (${formatPercent(totals.counts.deep, totals.counts.questions)}%)`);
lines.push(`- Mistakes coverage: ${totals.counts.mistakes}/${totals.counts.questions} (${formatPercent(totals.counts.mistakes, totals.counts.questions)}%)`);
lines.push(`- Follow-up coverage: ${totals.counts.followUp}/${totals.counts.questions} (${formatPercent(totals.counts.followUp, totals.counts.questions)}%)`);
lines.push(`- Code/pseudocode coverage: ${totals.counts.code}/${totals.counts.questions} (${formatPercent(totals.counts.code, totals.counts.questions)}%)`);
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

async function enforceBaseline(baselinePath, totals) {
const raw = await fs.readFile(baselinePath, "utf8");
const baseline = JSON.parse(raw);
const minimum = baseline.minimumCoveragePercent;

if (!minimum) {
throw new Error("Baseline file missing minimumCoveragePercent");
}

const failures = [];
const checks = ["direct", "deep", "mistakes", "followUp", "code"];

for (const key of checks) {
const min = Number(minimum[key] ?? 0);
const current = totals.percent[key];
if (current < min) {
failures.push(`${key} coverage ${current}% is below minimum ${min}%`);
}
}

if (failures.length) {
throw new Error(`Interview coverage gate failed:\n- ${failures.join("\n- ")}`);
}
}

async function main() {
const options = parseArgs();
const repoRoot = resolveRepoRoot(process.cwd());
const interviewsRoot = path.join(repoRoot, "library", "core");
const reportPath =
options.reportPath
? path.resolve(repoRoot, options.reportPath)
: path.join(repoRoot, "library", "_meta", "interview-coverage-report.md");
const summaryPath =
options.summaryPath
? path.resolve(repoRoot, options.summaryPath)
: path.join(repoRoot, "library", "_meta", "interview-coverage-summary.json");
const baselinePath =
options.baselinePath
? path.resolve(repoRoot, options.baselinePath)
: path.join(repoRoot, "library", "_meta", "interview-coverage-baseline.json");

const interviewFiles = await walkMarkdownFiles(interviewsRoot);
const summaries = [];

for (const filePath of interviewFiles) {
const markdown = await fs.readFile(filePath, "utf8");
const questions = parseQuestions(markdown);
summaries.push(summarizeFile(filePath, questions));
}

summaries.sort((a, b) => a.filePath.localeCompare(b.filePath));
const totals = computeTotals(summaries);
const report = buildReport(repoRoot, summaries, totals);

await fs.writeFile(reportPath, report, "utf8");
await fs.writeFile(
summaryPath,
`${JSON.stringify(
{
generatedAt: new Date().toISOString(),
totals,
files: summaries.map((summary) => ({
file: path.relative(repoRoot, summary.filePath).split(path.sep).join("/"),
counts: summary.counts,
missingCount: summary.missing.length
}))
},
null,
2
)}\n`,
"utf8"
);

if (options.enforceBaseline) {
await enforceBaseline(baselinePath, totals);
console.log(`Coverage baseline check passed using ${baselinePath}`);
}

console.log(`Wrote coverage report: ${reportPath}`);
console.log(`Wrote coverage summary: ${summaryPath}`);
}

main().catch((error) => {
console.error("Interview coverage check failed", error);
process.exit(1);
});
