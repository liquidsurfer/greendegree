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
| `/` | `src/pages/index.astro` | In progress |
| `/our-story` | `src/pages/our-story.astro` | Done |
| `/articles` | `src/pages/articles.astro` | Done |
| `/donate` | `src/pages/donate.astro` | Done |

## Design reference

Prototype files are in `/Users/sam/Downloads/green-website/project/`. The primary design is `Homepage v7.html`. Match it pixel-faithfully — dimensions, colours and layout rules are all in the HTML/CSS source.
