import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import sanitizeHtml from "sanitize-html";

import { resolveLinkTarget } from "./content";

marked.use(gfmHeadingId());
marked.setOptions({
	gfm: true
});

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
	allowedTags: [
		...sanitizeHtml.defaults.allowedTags,
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"img",
		"span",
		"table",
		"thead",
		"tbody",
		"tr",
		"th",
		"td"
	],
	allowedAttributes: {
		a: ["href", "name", "target", "rel"],
		img: ["src", "alt", "title", "width", "height", "loading"],
		code: ["class"],
		span: ["class"],
		h1: ["id"],
		h2: ["id"],
		h3: ["id"],
		h4: ["id"],
		h5: ["id"],
		h6: ["id"]
	},
	allowedSchemes: ["http", "https", "mailto"],
	transformTags: {
		a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true)
	}
};

function rewriteLinksOutsideCodeFences(markdown: string, sourcePath: string): string {
	const segments = markdown.split(/(```[\s\S]*?```)/g);

	return segments
		.map((segment) => {
			if (segment.startsWith("```")) {
				return segment;
			}

			return segment.replace(/(!?)\[([^\]]+)\]\(([^)]+)\)/g, (full, imageMarker, label, target) => {
				if (imageMarker === "!") {
					return full;
				}

				const rewritten = resolveLinkTarget(target, sourcePath);
				return `[${label}](${rewritten})`;
			});
		})
		.join("");
}

export function renderMarkdown(markdown: string, sourcePath: string): string {
	const normalized = rewriteLinksOutsideCodeFences(markdown, sourcePath);
	const rendered = marked.parse(normalized) as string;
	return sanitizeHtml(rendered, SANITIZE_OPTIONS);
}
