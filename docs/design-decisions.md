# Design Decisions
**Project:** Clean Shopper — Polaris design system review
**Date:** 2026-11-08

This file records decisions made during the design system token rename and rules audit. It is a log, not a living style guide. Add to it as new decisions are made.

---

## Token renames

The following token names were changed to use semantic, purpose-based names instead of appearance-based or legacy names.

| Old name | New name | Reason |
|---|---|---|
| `starlight` | `brand` | "Starlight" is a visual description; "brand" names the purpose. |
| `needs-you` | `warning` | Aligns with standard signal vocabulary. |
| `failed` | `danger` | Avoids collision with plain-English "failed" in prose. |
| `accepted` | `success` | Aligns with standard signal vocabulary. |
| `severity-*` | `safety-*` | The tokens describe ingredient/product safety in Clean Shopper, not code severity. |
| `data-label-blue` | `label-accent` | Removes the colour name from the token; names the role instead. |

Spacing density was flattened: the `calm-` prefix was dropped from all spacing tokens (`calm-row` → `row`, `calm-gap` → `gap`, etc.), and the `balanced` and `compact` density variants were removed. Only the calm/default scale remains.

---

## Tokens removed

The following token families were removed because they belong to Polaris (the Claude desktop app) and have no equivalent in Clean Shopper:

- `diff-*`
- `git-*`
- `harness-*`
- `syntax-*`
- `diagnostic-*`
- `context-system`, `context-tools`, `context-mcp`, `context-skills`, `context-memory`
- `pull-merged-*`
- `shell-*`

---

## Design rules audit

Twelve vague rules in the Do's and Don'ts section were rewritten as checkable Do/Don't pairs. Nine were accepted and written into `docs/design-system.md`. Three were reviewed and not accepted.

**Accepted (now in design-system.md):**
1. Colour check — every coloured element must be one of seven signal types
3. Tiles — only for sessions, Harnesses, toast sources, or Polaris-owned concepts
4. Cards — each card must have at least one primary user action (rule/no-dashboard-clutter)
6. Letter-spacing — normal in all working views; exceptions only for tagline and wordmark
8. Illustrations — every hero illustration must pass a one-sentence caption test
9. Signal count — zero or one non-neutral element at rest
10. Card purpose — each card replaces a user decision
11. Dither halo — only behind empty sky, scene backgrounds, or composer border
12. Popover at minimum viewport — test every scrollable popover at 1280×720 (rule/popover-fits-window)

**Not accepted (not in the file):**
- Rule 2: Instrument touches, kept rare (fewer than one-in-five rows at a time)
- Rule 5: `text-faint` only for placeholders, never for text the user must read
- Rule 7: No infinite animations on working surfaces except the Working dither

---

## "Ask me first" section

A section called "Ask me first" was added to `docs/design-system.md` immediately before the Do's and Don'ts. It instructs Claude to stop and ask before building when:

- A colour, size, or spacing value is needed that isn't in the system
- Two sources (this file, a Figma frame, a code file) disagree
- A choice is about hierarchy, tone, or whether a new pattern fits

When asking, Claude shows two or three options, states its preference and reason, and waits for an answer.
