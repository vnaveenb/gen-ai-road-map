// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const site = process.env.SITE_URL;

export default defineConfig({
	...(site ? { site } : {}),
	integrations: site ? [sitemap()] : []
});
