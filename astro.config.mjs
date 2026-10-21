import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://jonathanlerma.com',
  integrations: [react()],
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto', assets: 'assets' },
});
