# Diagram Guide

## Goal
Use visuals to improve understanding without making the docs hard to maintain.

## Recommended Approach
- Default: Mermaid for architecture, process, and decision flow diagrams.
- Use generated charts for performance curves and benchmark plots.
- Use static images only when Mermaid or generated charts are insufficient.

## Diagram Type Decision
1. Flowchart, lifecycle, or architecture map -> Mermaid.
2. Latency, memory, or cost trends -> generated chart image.
3. Heatmap or complex visual annotation -> static image.

## Style Rules
- Keep one diagram focused on one idea.
- Prefer 6 to 10 nodes per Mermaid diagram.
- Label tensor shapes where relevant.
- Add one caption line after each diagram.
- Add descriptive alt text for static images.

## Accessibility Rules
- Avoid color-only meaning.
- Use clear text labels for critical paths.
- Keep font-friendly and high contrast in generated images.

## Author Workflow
1. Draft section text.
2. Add Mermaid flow only where it clarifies logic.
3. Validate render in markdown preview.
4. Add references near the section.
5. Run local link check after edits.

## Suggested Folder Usage
- Store generated/static assets under [../_diagrams](../_diagrams).
- Keep diagram source scripts next to generated outputs when possible.

## Maintenance Notes
- If a diagram changes logic, update nearby text in the same commit.
- Prefer editing existing diagrams over creating duplicates.
