import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type DocType = "explainer" | "interview";

export interface Heading {
	level: number;
	text: string;
	slug: string;
}

export interface LibraryDoc {
	type: DocType;
	sourcePath: string;
	moduleSlug: string;
	id: string;
	slug: string;
	title: string;
	competency: string;
	difficulty: string;
	status: string;
	version: string;
	created: string;
	updated: string;
	tags: string[];
	readTimeMinutes?: number;
	questionCount?: number;
	prerequisites: string[];
	relatedLinks: string[];
	content: string;
	excerpt: string;
	headings: Heading[];
	frontmatter: Record<string, unknown>;
}

export interface CompetencySummary {
	id: string;
	name: string;
	moduleSlug: string;
	docs: LibraryDoc[];
	explainerCount: number;
	interviewCount: number;
	totalReadMinutes: number;
	totalQuestions: number;
}

const MODULE_TO_COMPETENCY: Record<string, string> = {
	"python-dsa": "C1",
	"ml-foundations": "C2",
	"transformers-llm": "C3",
	"adaptation-retrieval": "C4",
	"agents-evals-guardrails": "C5",
	"production-engineering": "C6"
};

const COMPETENCY_NAMES: Record<string, string> = {
	C1: "Python and DSA for AI Systems",
	C2: "ML and DL Fundamentals",
	C3: "Transformers and LLM Internals",
	C4: "Adaptation and Retrieval",
	C5: "Agents, Evals, and Guardrails",
	C6: "Production GenAI Engineering"
};

const COMPETENCY_ORDER = ["C1", "C2", "C3", "C4", "C5", "C6"];

const WEB_ROOT = process.cwd();
const REPO_ROOT = path.resolve(WEB_ROOT, "..");
const LIBRARY_ROOT = path.join(REPO_ROOT, "library");
const CORE_ROOT = path.join(LIBRARY_ROOT, "core");

export const ROADMAP_SOURCE_PATH = path.join(REPO_ROOT, "notes.md");

let docsCache: LibraryDoc[] | null = null;

function safeStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) {
		return [];
	}

	return value.filter((item): item is string => typeof item === "string");
}

function normalizeNumber(value: unknown): number | undefined {
	const parsed = Number(value);
	if (Number.isFinite(parsed)) {
		return parsed;
	}

	return undefined;
}

function walkMarkdownFiles(dirPath: string): string[] {
	const results: string[] = [];
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			results.push(...walkMarkdownFiles(fullPath));
			continue;
		}

		if (entry.isFile() && fullPath.endsWith(".md")) {
			results.push(fullPath);
		}
	}

	return results;
}

function toSlug(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function extractHeadings(markdown: string): Heading[] {
	const headings: Heading[] = [];
	const lines = markdown.split(/\r?\n/);
	let inCodeFence = false;

	for (const line of lines) {
		if (line.trim().startsWith("```")) {
			inCodeFence = !inCodeFence;
			continue;
		}

		if (inCodeFence) {
			continue;
		}

		const match = line.match(/^(#{2,4})\s+(.+)$/);
		if (!match) {
			continue;
		}

		const level = match[1].length;
		const text = match[2].trim();
		headings.push({
			level,
			text,
			slug: toSlug(text)
		});
	}

	return headings;
}

function extractExcerpt(markdown: string): string {
	const lines = markdown.split(/\r?\n/);
	let inCodeFence = false;

	for (const line of lines) {
		if (line.trim().startsWith("```")) {
			inCodeFence = !inCodeFence;
			continue;
		}

		if (inCodeFence) {
			continue;
		}

		const trimmed = line.trim();
		if (!trimmed) {
			continue;
		}

		if (
			trimmed.startsWith("#") ||
			trimmed.startsWith("-") ||
			trimmed.startsWith("*") ||
			trimmed.startsWith("1.") ||
			trimmed.startsWith("|") ||
			trimmed.startsWith(">")
		) {
			continue;
		}

		return trimmed;
	}

	return "";
}

function parseDoc(filePath: string): LibraryDoc | null {
	const relative = path.relative(CORE_ROOT, filePath);
	const segments = relative.split(path.sep);

	if (segments.length < 3) {
		return null;
	}

	const moduleSlug = segments[0];
	const section = segments[1];

	if (section !== "explainers" && section !== "interviews") {
		return null;
	}

	const type: DocType = section === "explainers" ? "explainer" : "interview";
	const fileContents = fs.readFileSync(filePath, "utf8");
	const parsed = matter(fileContents);
	const data = parsed.data as Record<string, unknown>;

	const id = typeof data.id === "string" ? data.id : path.basename(filePath, ".md");
	const slug = id;
	const competency =
		typeof data.competency === "string"
			? data.competency
			: MODULE_TO_COMPETENCY[moduleSlug] ?? "UNKNOWN";
	const title = typeof data.title === "string" ? data.title : slug;
	const relatedLinks =
		type === "explainer"
			? safeStringArray(data.interview_links)
			: safeStringArray(data.linked_explainers);

	return {
		type,
		sourcePath: filePath,
		moduleSlug,
		id,
		slug,
		title,
		competency,
		difficulty: typeof data.difficulty === "string" ? data.difficulty : "unknown",
		status: typeof data.status === "string" ? data.status : "unknown",
		version: typeof data.version === "string" ? data.version : "unknown",
		created: typeof data.created === "string" ? data.created : "",
		updated: typeof data.updated === "string" ? data.updated : "",
		tags: safeStringArray(data.tags),
		readTimeMinutes: normalizeNumber(data.estimated_read_time_minutes),
		questionCount: normalizeNumber(data.question_count),
		prerequisites: safeStringArray(data.prerequisites),
		relatedLinks,
		content: parsed.content,
		excerpt: extractExcerpt(parsed.content),
		headings: extractHeadings(parsed.content),
		frontmatter: data
	};
}

function sortDocs(docs: LibraryDoc[]): LibraryDoc[] {
	return docs.sort((a, b) => {
		const competencyDiff = COMPETENCY_ORDER.indexOf(a.competency) - COMPETENCY_ORDER.indexOf(b.competency);
		if (competencyDiff !== 0) {
			return competencyDiff;
		}

		if (a.type !== b.type) {
			return a.type.localeCompare(b.type);
		}

		return a.title.localeCompare(b.title);
	});
}

function loadAllDocs(): LibraryDoc[] {
	const files = walkMarkdownFiles(CORE_ROOT);
	const docs: LibraryDoc[] = [];

	for (const filePath of files) {
		const parsed = parseDoc(filePath);
		if (parsed) {
			docs.push(parsed);
		}
	}

	return sortDocs(docs);
}

export function getAllDocs(): LibraryDoc[] {
	if (!docsCache) {
		docsCache = loadAllDocs();
	}

	return docsCache;
}

export function getDocsByType(type: DocType): LibraryDoc[] {
	return getAllDocs().filter((doc) => doc.type === type);
}

export function getDocBySlug(type: DocType, slug: string): LibraryDoc | undefined {
	return getAllDocs().find((doc) => doc.type === type && doc.slug === slug);
}

export function getCompetencyName(id: string): string {
	return COMPETENCY_NAMES[id.toUpperCase()] ?? id.toUpperCase();
}

export function getCompetencySummaries(): CompetencySummary[] {
	const docs = getAllDocs();

	return COMPETENCY_ORDER.map((competencyId) => {
		const competencyDocs = docs.filter((doc) => doc.competency === competencyId);
		const explainerCount = competencyDocs.filter((doc) => doc.type === "explainer").length;
		const interviewCount = competencyDocs.filter((doc) => doc.type === "interview").length;
		const totalReadMinutes = competencyDocs.reduce(
			(total, doc) => total + (doc.readTimeMinutes ?? 0),
			0
		);
		const totalQuestions = competencyDocs.reduce(
			(total, doc) => total + (doc.questionCount ?? 0),
			0
		);
		const moduleSlug =
			Object.entries(MODULE_TO_COMPETENCY).find((entry) => entry[1] === competencyId)?.[0] ?? "";

		return {
			id: competencyId,
			name: getCompetencyName(competencyId),
			moduleSlug,
			docs: competencyDocs,
			explainerCount,
			interviewCount,
			totalReadMinutes,
			totalQuestions
		};
	});
}

export function getCompetencySummary(id: string): CompetencySummary | undefined {
	return getCompetencySummaries().find((summary) => summary.id.toLowerCase() === id.toLowerCase());
}

export function getRoadmapMarkdown(): string {
	return fs.readFileSync(ROADMAP_SOURCE_PATH, "utf8");
}

export function routeForDoc(doc: LibraryDoc): string {
	return doc.type === "explainer" ? `/explainers/${doc.slug}` : `/interviews/${doc.slug}`;
}

export function routeFromSourcePath(sourcePath: string): string | null {
	const normalized = path.normalize(sourcePath);
	const unixPath = normalized.split(path.sep).join("/");
	const fileName = path.basename(unixPath, ".md");

	if (unixPath.endsWith("/notes.md")) {
		return "/roadmap";
	}

	if (unixPath.includes("/library/core/") && unixPath.includes("/explainers/")) {
		return `/explainers/${fileName}`;
	}

	if (unixPath.includes("/library/core/") && unixPath.includes("/interviews/")) {
		return `/interviews/${fileName}`;
	}

	const readmeMatch = unixPath.match(/\/library\/core\/([^/]+)\/README\.md$/);
	if (readmeMatch) {
		const moduleSlug = readmeMatch[1];
		const competency = MODULE_TO_COMPETENCY[moduleSlug];
		if (competency) {
			return `/competencies/${competency.toLowerCase()}`;
		}
	}

	if (unixPath.endsWith("/library/_meta/index.md")) {
		return "/";
	}

	return null;
}

export function resolveLinkTarget(target: string, currentSourcePath: string): string {
	const trimmedTarget = target.trim();
	if (!trimmedTarget || trimmedTarget.startsWith("http") || trimmedTarget.startsWith("mailto:") || trimmedTarget.startsWith("#")) {
		return target;
	}

	const [linkPath, hash] = trimmedTarget.split("#");
	if (!linkPath.endsWith(".md")) {
		return target;
	}

	const resolvedPath = path.resolve(path.dirname(currentSourcePath), linkPath);
	const route = routeFromSourcePath(resolvedPath);
	if (!route) {
		return target;
	}

	return hash ? `${route}#${hash}` : route;
}

export function getRelatedDocs(doc: LibraryDoc): LibraryDoc[] {
	const allDocs = getAllDocs();
	const byId = new Map(allDocs.map((item) => [item.id, item]));
	const byPath = new Map(allDocs.map((item) => [path.normalize(item.sourcePath), item]));
	const seen = new Set<string>();
	const related: LibraryDoc[] = [];

	for (const linkValue of doc.relatedLinks) {
		let candidate: LibraryDoc | undefined;

		if (linkValue.endsWith(".md") || linkValue.includes(".md#")) {
			const [rawPath] = linkValue.split("#");
			const absolute = path.resolve(path.dirname(doc.sourcePath), rawPath);
			candidate = byPath.get(path.normalize(absolute));
		} else {
			candidate = byId.get(linkValue);
		}

		if (candidate && !seen.has(candidate.slug)) {
			seen.add(candidate.slug);
			related.push(candidate);
		}
	}

	return related;
}
