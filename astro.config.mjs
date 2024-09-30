import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from "starlight-links-validator";
import shikiConfig from './src/utils/shiki';

// https://astro.build/config
export default defineConfig({
	site: "https://shulkerscript.hoelting.dev",
	integrations: [
		starlight({
			title: 'Shulkerscript',
			logo: {
				src: './src/assets/logo.webp',
				alt: 'Shulkerscript Logo',
			},
			favicon: '/favicon.ico',
			description: 'A simple and powerful scripting language for Minecraft datapacks.',
			social: {
				email: 'mailto:shulkerscript@hoelting.dev',
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
			customCss: ['./src/styles/style.css'],
			plugins: [starlightLinksValidator({
				errorOnFallbackPages: false,
			})],
			expressiveCode: {
				shiki: shikiConfig,
			},
			components: {
				SocialIcons: './src/components/override/SocialIcons.astro',
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: {
						directory: 'guides',
					},
					translations: {
						de: 'Anleitungen',
					}
				},
				{
					label: 'Differences to other languages',
					link: '/differences',
					translations: {
						de: 'Unterschiede zu anderen Sprachen',
					},
				},
				{
					label: 'Roadmap',
					link: '/roadmap',
					translations: {
						de: 'Zukunftspläne',
					},
				},
				{
					label: 'Reference',
					autogenerate: {
						directory: 'reference',
					},
					collapsed: true,
					translations: {
						de: 'Referenz',
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
