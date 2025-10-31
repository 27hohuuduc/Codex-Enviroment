import { defineConfig } from 'astro/config';
import angular from '@analogjs/astro-angular';
import { fileURLToPath } from 'node:url';

const tsconfig = fileURLToPath(new URL('./tsconfig.app.json', import.meta.url));

const normalizeBase = (value) => {
  if (!value) return '/';
  let base = value;
  if (!base.startsWith('/')) {
    base = `/${base}`;
  }
  if (!base.endsWith('/')) {
    base = `${base}/`;
  }
  return base;
};

const base = normalizeBase(process.env.PUBLIC_BASE_PATH);
const site = process.env.PUBLIC_SITE;

export default defineConfig({
  site,
  base,
  integrations: [
    angular({
      vite: {
        tsconfig
      }
    })
  ],
  output: 'static',
  experimental: {
    contentIntellisense: true
  }
});
