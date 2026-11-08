# Component Spec — Clean Shopper

How each UI component looks and behaves. Built from the reference components file (`components.html` and `components.manifest.json`). Every visible value comes from a design token in `src/styles/tokens.css`. In code, use the Tailwind classes from `src/styles/tailwind.css` listed below, never raw hex or pixel values.

---

## Foundations

**Theme:** dark and light, following the device's appearance setting until someone picks one with the ThemeToggle. Components use the same token classes in both; only the values in `src/styles/tokens.css` change. Page background `bg-bg`, raised surfaces `bg-surface`, inset surfaces such as inputs and image wells `bg-surface-warm`.

**Colors by mode** (light values approved 2026-11-08; the Shopify reference has dark only)
| Token | Use | Dark | Light |
|---|---|---|---|
| `bg` | Page | #000000 | #ffffff |
| `surface` | Cards | #02090a | #f7f7f8 |
| `surface-warm` | Inputs, image wells, tags | #061a1c | #eaf2f0 |
| `fg` | Headings, strong text | #ffffff | #000000 |
| `muted` | Body and secondary text | #a1a1aa | #52525b |
| `meta` | Placeholder text only | #71717a | #71717a |
| `border` | Card borders | #1e2c31 | #e4e4e7 |
| `border-soft` | Inputs, chips, dashed panels | #3f3f46 | #8a8a93 |
| `accent` | Focus rings | #36f4a4 | #008060 |
| `success` | Clean score dot | #36f4a4 | #008060 |
| `warn` | Avoided-ingredient warning | #eab308 | #a16207 |

In dark mode `text-meta` is about 4.1:1 on `bg-surface`, below WCAG AA for normal text. Use it only for input placeholders, never for content.

**Accent:** `accent` is for focus rings only and never fills large surfaces. Light mode uses a deeper green because the neon green is nearly invisible on white. `success` matches it and may color small status marks (a dot or an icon), always with a text label beside it.

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

> **Approved 2026-11-08.** Replaces the earlier read-only label: CategoryTag is now a filter. The reference file has no tags, so this section builds one from the chip, button and type rules above.

A pill people tap to filter products by category, such as "All", "Home", "Personal care" or "Pantry". It is a shared component (`src/components/CategoryTag.jsx`).

CategoryTag does not track which category is selected. The parent page holds that, passes `isActive` to each tag, and updates it when a tag's `onClick` fires.

### Look

- Shape: `inline-flex items-center rounded-pill px-3 py-1`, no border.
- Text: `font-body text-sm font-medium`, single line (`whitespace-nowrap`).
- Motion: `transition-colors duration-fast ease-standard`.

| State | Classes |
|---|---|
| Active | `bg-fg text-bg` (white pill, black text, the same pairing as the primary button) |
| Inactive | `bg-surface-warm text-muted` |
| Inactive, hover | `text-fg` |
| Keyboard focus | `focus-visible:outline-none focus-visible:shadow-focus-ring` |

The accent green is not used for the active state: it is reserved for focus rings.

### Props

| Prop | Type | Required |
|---|---|---|
| `label` | string | yes |
| `isActive` | boolean | no (default false) |
| `onClick` | function | no |

### Accessibility

- Rendered as a `button` with `aria-pressed` set from `isActive`, so screen readers announce "selected" or "not selected".
- Reachable with Tab and pressed with Enter or Space.
- The parent wraps the tags in a group with a label, such as `role="group" aria-label="Filter by category"`.
- `text-muted` on `bg-surface-warm` and `text-bg` on `bg-fg` are both above WCAG AA.

---

## SiteHeader

> **Proposed 2026-11-08.** Built from the type, color and ThemeToggle rules above.

The bar at the top of every page: the Clean Shopper name, links to each page, and the ThemeToggle. It is a shared component (`src/components/SiteHeader.jsx`), rendered once in `App.jsx` above the pages.

### Structure

A full-width `header` with a bottom border (`border-b border-border`). Inside, a row on the page's content width (same container and gutters as the pages, `py-4`):

1. **Wordmark:** a 24px leaf mark (`size-5`) and "Clean Shopper" in `font-display text-lg text-fg`. Links to the landing page.
2. **Navigation** (`nav` labelled "Main"): "Home" and "Browse", `text-sm`, `gap-5`. The current page is `font-medium text-fg` and marked `aria-current="page"`; the others are `text-muted`, hover `text-fg`.
3. **ThemeToggle**, after the links.

On narrow screens the row wraps: the wordmark sits on the first line and the links with the toggle move to a second line, rather than shrinking.

### Accessibility

- Every link and the toggle are reachable with Tab and show the focus ring.
- The current page is announced by screen readers through `aria-current`.

---

## ThemeToggle

> **Approved 2026-11-08.** Built from the CategoryTag pill and Button rules above.

A switch that turns dark mode on or off for the whole app. It is a shared component (`src/components/ThemeToggle.jsx`).

### Look

- Shape: `inline-flex items-center gap-2 rounded-pill border border-border-soft px-3 py-1`, transparent fill, hover `bg-surface-warm`.
- Content: a 16px icon (moon when dark mode is on, sun when it is off) and the label "Dark mode" in `font-body text-sm font-medium text-fg`.
- Focus: `focus-visible:outline-none focus-visible:shadow-focus-ring`.

### Behavior

- Until someone uses it, the app follows the device's appearance setting.
- Using it saves the choice in the browser (`localStorage`), so it stays on reload. A script in `index.html` applies the saved choice before the page draws, so the page never flashes the wrong theme.
- The choice is stored on `<html data-theme="light|dark">`, which `src/styles/tokens.css` reads.

### Accessibility

- A `button` with `role="switch"` and `aria-checked` set to whether dark mode is on. Screen readers announce "Dark mode, switch, on" or "off".
- Reachable with Tab, toggled with Enter or Space.

### Placement

In the SiteHeader, at the right end, after the navigation links.

---

## SearchBar

> **Approved 2026-11-08.** Built from the Input field and Button rules above.

Lets people search for products by name, brand or type. It is a shared component (`src/components/SearchBar.jsx`). It does not search by itself: the page holds the text and runs the search when the form is submitted.

### Structure

A `form` with `role="search"`:

1. **Label:** "Search products", following the Input field label rules (`text-sm font-medium text-muted`), always visible.
2. **Row** (`flex gap-2`):
   - **Input:** Input field rules (`bg-surface-warm text-fg border border-border-soft rounded-md px-4 py-3 text-base`, placeholder `text-meta`, focus `border-accent shadow-focus-ring`), `type="search"`, fills the row.
   - **Button:** small primary pill, "Search" (`bg-fg text-bg`).

### Behavior

- Searching runs on Enter or the Search button, not on every keystroke. Open Beauty Facts asks apps to keep searches to about 10 a minute.
- The Search button is disabled while the field is empty or a search is running, and reads "Searching…" while it runs.

### Props

| Prop | Type | Required |
|---|---|---|
| `value` | string | yes |
| `onChange` | function (new text) | yes |
| `onSubmit` | function | yes |
| `isSearching` | boolean | no |

### On the browse page

The SearchBar sits above the category filters. A search replaces the grid with results from Open Beauty Facts (US edition). States:

| State | Shows |
|---|---|
| Searching | "Searching Open Beauty Facts…" (announced to screen readers) |
| Results | "N results for "query"" with a "Clear search" ghost button, then the ProductCard grid |
| No results | EmptyState: "No products found for "query"", action "Clear search" |
| Error | EmptyState: "Search isn't working right now", action "Try again" |

Clearing the search, or emptying the field, returns to the browse grid. The category filters are hidden while results show, since every Open Beauty Facts product is personal care.

---

## EmptyState

> **Approved 2026-11-08.** The reference file has no empty state, so this section builds one from the card, button and type rules above.

Shown in place of content when there is nothing to show, such as a category with no products, an empty shopping list or a search with no results. It says what is missing and offers a way forward. It is a shared component (`src/components/EmptyState.jsx`).

### Structure (top to bottom, centered)

1. **Icon:** 36px outline icon (`size-8`, stroke 1.75) in `text-muted`, decorative (`aria-hidden`).
2. **Title:** an `h3` in `font-display text-lg font-normal leading-tight text-fg`.
3. **Message (optional):** `text-sm leading-body text-muted`.
4. **Action (optional):** a small ghost pill button (see Button, small size): `border-fg bg-transparent text-fg`, hover `bg-fg text-bg`.

### Container

`flex flex-col items-center gap-3 rounded-md border border-dashed border-border-soft p-8 text-center`. No fill and no shadow: the dashed border reads as a space waiting for content, not as a card.

### States

| State | Shows |
|---|---|
| Default | Icon, title, message |
| With action | Icon, title, message, button |
| Title only | Icon, title |

The button appears only when both `actionLabel` and `onAction` are given.

### Props

| Prop | Type | Required |
|---|---|---|
| `title` | string | yes |
| `message` | string | no |
| `actionLabel` | string | no |
| `onAction` | function | no |

### Accessibility

- The button is a real `button`, reachable with Tab, with the green focus ring.
- `text-muted` and `text-fg` on `bg-bg` are both above WCAG AA.

### On the browse page

When the selected category has no products: title "No products in this category yet.", message "We're still finding clean {category} products.", action "Show all products", which sets the filter back to All.

---

## CartItem

> **Proposed 2026-11-08.** Built from the Card and type rules above.

One product in the cart, as a compact row: shorter than a ProductCard so the cart stays scannable on a phone. It is a shared component (`src/components/CartItem.jsx`), used on the cart and email pages.

### Structure

A `li`: `flex items-start gap-4 rounded-md border border-border bg-surface p-4 shadow-raised`.

- **Left, fills the row:** name (`font-display text-base text-fg`, wraps, never cut off), then "Brand · Category, subcategory" in `text-sm text-muted`, then the clean score row from ProductCard when there is one.
- **Right:** the price (`font-display text-base text-fg`) or "Price not listed" (`text-sm text-muted`), and under it a "Remove" text button with an × icon (`text-sm text-muted`, hover `text-fg`), labelled "Remove {name} from cart" for screen readers.

### Props

`name`, `brand`, `category` (required); `subcategory`, `cleanScore`, `price`, `onRemove` (optional).

---

## CartSummary

> **Proposed 2026-11-08.**

The totals panel on the cart and email pages (`src/components/CartSummary.jsx`): a "Products" count, then a "Subtotal" row in `font-display text-base`. The subtotal counts only products with a price. When some have none, a `text-sm text-muted` note says how many were left out ("1 product has no listed price and isn't included"), and when none have a price the subtotal shows "—" rather than $0.00.

---

## Cart and email pages

> **Proposed 2026-11-08.**

- **Cart** (`/saved`, "Your cart"): CartItem rows on the left (two-thirds width on desktop), and a "Summary" panel with CartSummary, "Email my cart" (small primary) and "Keep browsing" (small ghost). Empty cart: EmptyState "Your cart is empty" with "Browse products".
- **Email** (`/checkout`, "Email your cart"): breadcrumb Cart › Email, CartItem rows grouped under a heading per category, and a "Send it to yourself" panel with CartSummary, "Open email" and "Copy list". Clean Shopper has no email service, so "Open email" opens the shopper's own email app with the list filled in (a `mailto:` link) and "Copy list" copies the same text. The panel says so plainly and never claims the app sent anything.
- **Words:** the cart is always called the cart: "Add to cart", "In cart", "Cart", "Your cart", "Email my cart". The emailed or copied text is "the list". Avoid "checkout" in what people read, since the app doesn’t take payment.

---

## CompareTray

> **Proposed 2026-11-08.**

A panel that sticks to the bottom of the screen on the Browse page while at least one product is picked for comparing (`src/components/CompareTray.jsx`). It keeps the comparison in view while the shopper keeps browsing or searching.

- Container: `sticky bottom-4` as the last thing on the page, so it floats over the grid while scrolling and settles below the last cards at the end instead of covering them. Card look: `rounded-md border border-border bg-surface p-4 shadow-raised`, `mt-8`.
- Left: "Compare" with a count ("2 of 3"), then each picked product as a small pill (`rounded-pill bg-surface-warm px-3 py-1 text-sm text-fg`) with an × button labelled "Remove {name} from comparison". The pills scroll sideways on phones.
- Right: "Compare now" (small primary, links to `/compare`) and "Clear" (text button). With only one product picked, "Compare now" is disabled and the count reads "Pick 1 more".
- Announces changes politely to screen readers.

---

## Compare page

> **Proposed 2026-11-08.**

`/compare`, "Compare products": two or three products side by side, with a clear pick.

- **Recommendation** at the top, in a Card: "Our pick: {name}" and one sentence on why. The pick skips products with an ingredient the shopper avoids (fragrance, until saved preferences exist), then takes the highest clean score, then the most certifications. If every product has an avoided ingredient, it picks the highest score and says so.
- **Table:** one column per product, headed by the product name and brand, with the pick marked "Our pick". Rows, each with its label above the values so three columns fit a phone: Price, Clean score, Avoided ingredients ("None" or "Contains fragrance" in `text-warn`), Certifications, Category, Why it fits. A `table` with a caption; each row group is labelled for screen readers.
- **Under each column:** Add to cart / In cart (ProductCard's button states) and "Remove" (text button).
- **Empty or one product:** EmptyState "Pick at least two products to compare" with "Browse products".

Comparing isn't saved: it resets when the page reloads, like the cart.

---

## ProductCard

> **Approved 2026-11-08.** The reference file has no product card, so this section builds one from the Card, Button and type rules above plus the brief.

Shows one recommended product, why it fits the user's preferences, and the actions Save and Compare. It is a shared component (`src/components/ProductCard.jsx`) used on browse, search results and the shopping list.

### Content (top to bottom)

1. **Image well:** 4:3 frame, `bg-surface-warm rounded-md`, image covers the frame. Without an image it shows a centered 36px outline icon (`size-8`) in `text-muted`. The image's alt text is the product name.
2. **Category:** a CategoryTag with the top-level category (such as Personal care, Home cleaning or Baby care), then the subcategory as `text-sm text-muted`, for example [Home] Cleaning. Row: `flex items-center gap-2 mb-1`. Tapping the tag sets the page's category filter, the same as tapping it in the filter row. The tag shows as active while the page is filtered to its category.
3. **Name:** an `h3` element styled as card title: `font-display text-lg text-fg`, weight 400, `leading-tight` (1.00). Clamps to 2 lines.
4. **Brand and price:** brand in `text-sm text-muted`, then the price in `font-display text-base text-fg`. Products without a price (search results) show "Price not listed" in `text-sm text-muted` instead.
5. **Clean score:** a row with an 8px `bg-success` dot and the text "Clean score 92/100" in `text-sm text-fg`. The number always appears in text, so the dot is never the only signal. Open Beauty Facts has no scores, so search results get a made-up placeholder score for now (`searchProducts.js`). When a product has no score at all, the row reads "No clean score yet" in `text-sm text-muted` with no dot.
6. **Certifications:** a wrapping row of chips (`gap-2`). Each chip: `rounded-pill border border-border-soft px-3 py-1 text-sm text-muted`. Show at most 3, then a "+N" chip.
7. **Reason:** one or two sentences on why it fits, `text-sm text-muted`, line height `leading-body`.
8. **Preference warning (optional):** shown only when the product contains an ingredient the user avoids. `text-sm text-warn` with a 16px warning icon, for example "Contains fragrance, which you avoid". The text always names the ingredient.
9. **Actions:** a wrapping row (`gap-3`, `mt-auto` so actions align across cards in a grid), using the small button size:
   - "Add to cart": small primary pill (`bg-fg text-bg`). Once added it changes to an outlined pill (`border-fg bg-transparent text-fg`, hover `bg-surface-warm`) with a 16px check icon reading "In cart", and sets `aria-pressed="true"`. Pressing it again removes the product. The two states differ in fill, icon and label, not just wording.
   - "Compare": small ghost pill, shown only when the page passes `onCompare` (Browse does). Once picked it reads "Comparing" with a check icon on a `bg-surface-warm` fill and sets `aria-pressed="true"`; pressing again takes it back out. When three products are already picked, the others' Compare buttons are disabled (50% opacity) and read "Compare (3 max)".

### Container

Card rules (`bg-surface border border-border rounded-md p-6 shadow-raised`) plus `flex flex-col gap-4 h-full`. The card itself is not clickable; only its category tag and buttons are.

### Props

| Prop | Type | Required |
|---|---|---|
| `name` | string | yes |
| `brand` | string | yes |
| `category` | string, a top-level category such as Personal care | yes |
| `subcategory` | string | no |
| `categoryActive` | boolean | no |
| `onCategoryClick` | function | no |
| `cleanScore` | number 0–100 | no |
| `certifications` | string[] | no |
| `reason` | string | no |
| `avoidedIngredient` | string | no |
| `imageUrl` | string | no |
| `price` | number | no |
| `saved` | boolean | no |
| `comparing`, `compareDisabled` | boolean | no |
| `onSave`, `onCompare` | function | no |

### Accessibility

- Rendered as an `article` so screen readers announce each product as its own item.
- Buttons, including the category tag, are real `button` elements reachable with Tab, with the green focus ring.
- All text meets WCAG AA on `bg-surface`.

### Out of scope

Retailer links are left out: V1 has no retailer integrations.
