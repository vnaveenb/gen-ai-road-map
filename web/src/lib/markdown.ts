import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

import { resolveLinkTarget } from "./content";

marked.use(gfmHeadingId());
marked.setOptions({
	gfm: true
});

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
	return marked.parse(normalized) as string;
}
