---
name: new-page
description: Scaffold a new Astro page for the greendegree site. Encodes the project's layout, CSS token, and BEM conventions so every page is consistent.
tools: Read, Write, Bash
---

# New Page

Create a new page at `src/pages/<slug>.astro` using the conventions below. The user provides the slug and a brief description of the page's purpose.

## Conventions

**Layout**: always wrap in `<Layout title="<page-name> — green°" description="...">`.

**CSS prefix**: derive a 2–3 letter prefix from the slug (e.g. `contact` → `ct-`, `impact` → `ip-`). All class names in the page use this prefix with BEM: `<prefix>-<block>`, `<prefix>-<block>__<element>`.

**Spacing tokens** — never hardcode pixel values for horizontal insets:
- Desktop: `padding-inline: var(--page-pad)` (32px)
- Mobile: `padding-inline: var(--page-pad-mobile)` (20px)
- Max-width sections: `max-width: var(--page-max); margin: 0 auto`

**Typography**:
- Display / headings: `font-family: var(--font-display); font-weight: 300; letter-spacing: -0.02em to -0.03em`
- Body: `font-family: var(--font-ui); font-size: 17–18px; line-height: 1.8`
- Eyebrow labels: `<span class="gn-eyebrow">` (global utility class)

**Colours**: use only CSS custom properties — `var(--color-ink)`, `var(--color-ink-soft)`, `var(--color-ink-faint)`, `var(--color-bg)`, `var(--color-bg-tint)`, `var(--color-lime)`, `var(--color-sage)`, `var(--color-rule)`.

**Responsive breakpoint**: `@media (max-width: 720px)` for most sections; `@media (max-width: 820px)` for two-column grids. Switch to `var(--page-pad-mobile)` inside breakpoints.

**Text width**: constrain prose with `max-width: 52ch` (or similar) on individual `<p>` elements, not on a wrapper — so the section background still bleeds to the edge.

## Template

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="<page-title> — green°" description="<meta description>">

<!-- Hero -->
<header class="<prefix>-hero">
  <span class="gn-eyebrow <prefix>-hero__eyebrow"><page-name></span>
  <h1 class="<prefix>-hero__title"><heading></h1>
</header>

<!-- Main content sections here -->

</Layout>

<style>
.<prefix>-hero {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: 144px var(--page-pad) 80px;
}
.<prefix>-hero__eyebrow { margin-bottom: 32px; }
.<prefix>-hero__title {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: clamp(3rem, 7vw, 6.5rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: var(--color-ink);
  margin: 0;
  max-width: 14ch;
  text-wrap: balance;
}
@media (max-width: 720px) {
  .<prefix>-hero { padding: 96px var(--page-pad-mobile) 48px; }
}
</style>
```

## Steps

1. Ask the user for the slug and purpose if not provided.
2. Determine the CSS prefix from the slug.
3. Write the file to `src/pages/<slug>.astro`.
4. Remind the user to add the route to `src/config/routes.ts` and the nav in `src/layouts/Layout.astro` if it should appear in navigation.
