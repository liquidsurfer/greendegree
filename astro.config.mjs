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
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
