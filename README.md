# green°

green° is a Cape Town non-profit that upcycles kites, denim, and parachutes into bags. 100% of profits fund stationery for three primary schools.

**Site:** [greendegree.org](https://greendegree.org)

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) 6 (static output) |
| Styling | Tailwind CSS v4 (via Vite plugin) + custom CSS properties |
| Package manager | Bun |
| Hosting | Cloudflare Pages (auto-deploy on `main`) |
| Payments | Yoco (ZAR donations via Cloudflare Workers function) |
| Product data | Airtable — fetched at build time, baked into static output |
| Image optimisation | Astro Image component (WebP, lazy loading) |
| Fonts | Fraunces (display) · Inter (UI) — self-hosted, variable |

No JS framework. No UI component library. Styling is a custom CSS design system (CSS custom properties) with Tailwind available but used sparingly.

---

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `index.astro` | Landing — hero, product showcase, impact counters |
| `/our-story` | `our-story.astro` | Brand narrative and mission |
| `/articles` | `articles.astro` | Content hub |
| `/donate` | `donate.astro` | Donation form (Yoco payment integration) |
| `/shop` | `shop.astro` | Product listing (Airtable) |
| `/shop/[slug]` | `shop/[slug].astro` | Product detail (statically generated at build) |
| `/contact` | `contact.astro` | Contact form |
| `/coming-soon` | `coming-soon.astro` | Shop placeholder |
| `/privacy` | `privacy.astro` | Privacy policy |
| `/terms` | `terms.astro` | Terms of service |
| `*` | `404.astro` | Not found |

---

## Project structure

```
greendegree/
├── functions/api/charge.js   # Cloudflare Worker — Yoco payment processing
├── public/                   # Static assets (fonts, favicon, OG image, robots.txt)
├── src/
│   ├── assets/images/        # Product and page images
│   ├── config/
│   │   ├── brand.ts          # Brand constants (name, emails, social)
│   │   └── routes.ts         # Route definitions
│   ├── components/
│   │   └── ProductCard.astro # Reusable product tile
│   ├── layouts/
│   │   └── Layout.astro      # Global wrapper — nav, header, footer
│   ├── lib/
│   │   └── products.ts       # Airtable product fetching + mock fallback
│   ├── pages/                # File-based routing (one file = one route)
│   └── styles/
│       └── global.css        # Full design system (~3,500 lines, CSS custom properties)
├── astro.config.mjs
└── package.json
```

---

## Local development

```bash
bun install
bun run dev       # http://localhost:4321
bun run build     # static output → dist/
bun run preview   # preview the build locally
```

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `YOCO_SECRET_KEY` | Yes (donate page) | Yoco payment API key |
| `AIRTABLE_API_KEY` | No (falls back to mock data) | Airtable read token |
| `AIRTABLE_BASE_ID` | No | Airtable base ID |
| `AIRTABLE_TABLE_NAME` | No (defaults to `Products`) | Airtable table name |

Set `YOCO_SECRET_KEY` in the Cloudflare Pages dashboard under Settings → Environment Variables — never commit it to the repo.

---

## Deployment

Cloudflare Pages builds and deploys automatically when `main` is updated. Build command: `bun run build`. Output directory: `dist`.

The Yoco payment endpoint runs as a Cloudflare Worker (`functions/api/charge.js`) and is deployed alongside the static site automatically.

---

## Contributing

All work happens in git worktrees — never directly on `main` or in the main working directory. See `CLAUDE.md` for the full branching workflow.
