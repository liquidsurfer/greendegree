// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://greendegree.org',
  integrations: [
    // /shop and its product pages stay reachable by direct URL but are not
    // linked from anywhere while the online shop is closed. Keep them out of
    // the sitemap so search engines don't surface them.
    sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/shop') }),
  ],
  // Astro 7 changed the default to 'jsx', which deletes the newlines between
  // inline elements instead of collapsing them to a space. The homepage hero
  // sentence (.hp-diagram-sentence / .hp-mob-sentence-text) is written one word
  // per line and relies on those newlines rendering as spaces.
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
