import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from "starlight-links-validator";
import shikiConfig from './src/utils/shiki';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ShulkerScript',
			logo: {
				src: './src/assets/logo.webp',
				alt: 'ShulkerScript Logo',
			},
			favicon: '/favicon.ico',
			description: 'A simple and powerful scripting language for Minecraft datapacks.',
			social: {
				github: 'https://github.com/moritz-hoelting/shulkerscript-cli',
			},
			tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 3 },
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				de: {
					label: 'Deutsch',
					lang: 'de',
				},
			},
			editLink: {
				baseUrl: 'https://github.com/moritz-hoelting/shulkerscript-webpage/edit/main',
			},
			plugins: [starlightLinksValidator({
				errorOnFallbackPages: false,
			})],
			expressiveCode: {
				shiki: shikiConfig,
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: {
						directory: 'guides',
					},
				},
				{
					label: 'Reference',
					autogenerate: {
						directory: 'reference',
					},
					badge: {
						text: 'WIP',
						variant: 'caution',
					}
				}
			]
		}),
	],
});
