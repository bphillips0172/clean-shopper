# Component Spec — Clean Shopper

How each UI component looks and behaves. Built from the reference components file (`components.html` and `components.manifest.json`). Every visible value comes from a design token in `src/styles/tokens.css`. In code, use the Tailwind classes from `src/styles/tailwind.css` listed below, never raw hex or pixel values.

---

## Foundations

**Theme:** dark. Page background `bg-bg` (#000000), raised surfaces `bg-surface`, inset surfaces such as inputs and image wells `bg-surface-warm`.

**Text colors**
| Use | Class | Value |
|---|---|---|
| Headings, strong text | `text-fg` | #ffffff |
| Body and secondary text | `text-muted` | #a1a1aa |
| Placeholder text only | `text-meta` | #71717a |

`text-meta` is about 4.1:1 on `bg-surface`, below WCAG AA for normal text. Use it only for input placeholders, never for content.

**Accent:** `accent` (#36F4A4, neon green) is for focus rings only and never fills large surfaces. `success` has the same value and may color small status marks (a dot or an icon), always with a text label beside it.

**Type**
| Role | Font | Size | Weight | Line height |
|---|---|---|---|---|
| Display (h1) | `font-display` | `text-4xl` 96px | 330 | `leading-tight` 1.00 |
| Heading (h2) | `font-display` | `text-3xl` 70px | 330 | 1.00 |
| Heading (h3) | `font-display` | `text-xl` 32px | 360 | 1.14, tracking 0.32px |
| Lead | `font-body` | `text-lg` 20px | 500 | 1.40, tracking 0.3px |
| Body | `font-body` | `text-base` 18px | 400 | `leading-body` 1.56 |
| Small / label | `font-body` | `text-sm` 14px | 500 | inherits |

All text uses the `ss03` font feature.

**Spacing:** `1` 4px · `2` 8px · `3` 12px · `4` 16px · `5` 24px · `6` 28px · `8` 36px · `12` 64px (for example `p-6`, `gap-4`). These are not Tailwind's default steps.

**Radius:** `rounded-md` 8px (cards, inputs) · `rounded-lg` 12px · `rounded-pill` 9999px (buttons, chips). Note that `rounded-sm` is also 9999px.

**Elevation:** `shadow-raised` for cards, `shadow-ring` for a 1px border ring, `shadow-focus-ring` for keyboard focus.

**Motion:** `duration-base` 200ms or `duration-fast` 150ms, with `ease-standard`.

**Layout:** content max width 1280px (`max-w-[var(--container-max)]`), with side gutters of 64px desktop, 32px tablet (below 1024px) and 16px phone (below 640px).

---

## Button

Full pill for every call to action. This rule is non-negotiable.

- Shape: `inline-flex items-center gap-2 rounded-pill`, padding 12px top and bottom, 16px left, 26px right, 2px transparent border.
- Text: `font-display text-base`, weight 400, line height 1.5.
- Motion: `transition-all duration-base ease-standard`.
- Focus: `focus-visible:outline-none focus-visible:shadow-focus-ring`.

| Variant | Rest | Hover |
|---|---|---|
| Primary | `bg-fg text-bg` | 90% opacity |
| Ghost | transparent, `text-fg`, `border-fg` | `bg-fg text-bg` |

**Small size** (used inside cards): `px-4 py-2 text-sm leading-body` with a 1px border instead of 2px. Everything else is the same.

An optional 16px trailing icon (`size-4 shrink-0`, stroke 1.75, `currentColor`) sits after the label.

---

## Input field

- Wrapper: `flex flex-col gap-2`.
- Label: `text-sm font-medium text-muted`, always visible and linked to the input.
- Input: `bg-surface-warm text-fg border border-border-soft rounded-md`, padding 12px 16px, `font-body text-base`, placeholder `text-meta`.
- Focus: `border-accent shadow-focus-ring`, transitioning border and shadow at `duration-fast`.

---

## Card

The base panel that other components build on.

- `bg-surface border border-border rounded-md p-6 shadow-raised`
- `transition-shadow duration-base ease-standard`

---

## Stat

- `flex flex-col gap-2`
- Number: `font-display text-3xl text-fg`, weight 750, line height 1.00.
- Label: `text-sm text-muted`.

---

## CategoryTag

> **Approved 2026-11-08.** The reference file has no tags, so this section builds one from the chip and type rules above.

A small read-only label naming a product's category, such as "Home", "Personal care" or "Pantry". It is a shared component (`src/components/CategoryTag.jsx`). It is not clickable and takes no keyboard focus.

### Look

- Shape: `inline-flex items-center rounded-pill px-3 py-1`.
- Fill: `bg-surface-warm`, no border. This tells it apart from the outlined certification chips on ProductCard.
- Text: `font-body text-sm font-medium text-fg`, single line (`whitespace-nowrap`).

### Props

| Prop | Type | Required |
|---|---|---|
| `label` | string | yes |

### Accessibility

- Rendered as a `span`, so screen readers read it as plain text.
- `text-fg` on `bg-surface-warm` is well above WCAG AA.

---

## ProductCard

> **Approved 2026-11-08.** The reference file has no product card, so this section builds one from the Card, Button and type rules above plus the brief.

Shows one recommended product, why it fits the user's preferences, and the actions Save and Compare. It is a shared component (`src/components/ProductCard.jsx`) used on browse, search results and the shopping list.

### Content (top to bottom)

1. **Image well:** 4:3 frame, `bg-surface-warm rounded-md`, image covers the frame. Without an image it shows a centered 36px outline icon (`size-8`) in `text-muted`. The image's alt text is the product name.
2. **Category:** `text-sm text-muted`, for example "Home · Cleaning".
3. **Name:** an `h3` element styled as card title: `font-display text-lg text-fg`, weight 400, `leading-tight` (1.00). Clamps to 2 lines.
4. **Brand:** `text-sm text-muted`.
5. **Clean score:** a row with an 8px `bg-success` dot and the text "Clean score 92/100" in `text-sm text-fg`. The number always appears in text, so the dot is never the only signal.
6. **Certifications:** a wrapping row of chips (`gap-2`). Each chip: `rounded-pill border border-border-soft px-3 py-1 text-sm text-muted`. Show at most 3, then a "+N" chip.
7. **Reason:** one or two sentences on why it fits, `text-sm text-muted`, line height `leading-body`.
8. **Preference warning (optional):** shown only when the product contains an ingredient the user avoids. `text-sm text-warn` with a 16px warning icon, for example "Contains fragrance, which you avoid". The text always names the ingredient.
9. **Actions:** a wrapping row (`gap-3`, `mt-auto` so actions align across cards in a grid), using the small button size:
   - Primary button "Save to list". When saved it reads "Saved" and sets `aria-pressed="true"`.
   - Ghost button "Compare".

### Container

Card rules (`bg-surface border border-border rounded-md p-6 shadow-raised`) plus `flex flex-col gap-4 h-full`. The card itself is not clickable; only its buttons are.

### Props

| Prop | Type | Required |
|---|---|---|
| `name` | string | yes |
| `brand` | string | yes |
| `category` | string | yes |
| `cleanScore` | number 0–100 | yes |
| `certifications` | string[] | no |
| `reason` | string | no |
| `avoidedIngredient` | string | no |
| `imageUrl` | string | no |
| `saved` | boolean | no |
| `onSave`, `onCompare` | function | no |

### Accessibility

- Rendered as an `article` so screen readers announce each product as its own item.
- Buttons are real `button` elements reachable with Tab, with the green focus ring.
- All text meets WCAG AA on `bg-surface`.

### Out of scope

Price and retailer links are left out: V1 has no retailer integrations.
