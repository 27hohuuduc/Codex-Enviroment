import { defineConfig } from 'astro/config';
import angular from '@analogjs/astro-angular';
import { fileURLToPath } from 'node:url';

const tsconfig = fileURLToPath(new URL('./tsconfig.app.json', import.meta.url));

export default defineConfig({
  integrations: [
    angular({
      vite: {
        tsconfig
      }
    })
  ],
  output: 'static',
  build: {
    assetsPrefix: `/${process.env.URL_PAGE}/`
  },
  experimental: {
    contentIntellisense: true
  }
});
