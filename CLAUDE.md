# greendegree — agent instructions

## Branching strategy

**Always use worktrees.** Never work directly in the main working directory or on `main`.

When starting any task:
1. Create a new worktree: `git worktree add ../greendegree-<feature-name> -b feature/<feature-name>`
2. Do all work inside that worktree directory
3. Commit there, then let the user merge

This prevents agents from trampling each other's work when running in parallel.

## Stack

- Astro + Tailwind CSS v4
- Bun (use `bun run dev`, `bun run build`)
- Dev server: `http://localhost:4321`

## Pages

| Route | File | Status |
|---|---|---|
| `/` | `src/pages/index.astro` | Done |
| `/our-story` | `src/pages/our-story.astro` | Done |
| `/articles` | `src/pages/articles.astro` | Done |
| `/donate` | `src/pages/donate.astro` | Done |

## Brand contacts

- Instagram: https://www.instagram.com/greendegree_/
- Email (Anne): anne@greendegree.org
- Email (Cheryl): cheryl@greendegree.org

## X-axis alignment rule

All content edges — text, section headers, nav items, footers — must align to a single horizontal axis per viewport:

- **Desktop:** `var(--page-pad)` = `32px` from the viewport edge
- **Mobile:** `var(--page-pad-mobile)` = `20px` from the viewport edge

When writing CSS for any section, use `padding-inline: var(--page-pad)` (desktop) and `padding-inline: var(--page-pad-mobile)` (mobile) as the horizontal inset. Never hard-code pixel values that diverge from these tokens. Do not add `margin: 0 auto` with a narrow `max-width` on inner containers that would visually indent the content away from the page edge — constrain text width on individual elements (e.g. `max-width: 52ch` on `<p>`) instead.

## Design reference

Prototype files are in `/Users/sam/Downloads/green-website/project/`. The primary design is `Homepage v7.html`. Match it pixel-faithfully — dimensions, colours and layout rules are all in the HTML/CSS source.
