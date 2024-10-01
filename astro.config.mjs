import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
// import starlightLinksValidator from "starlight-links-validator";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import wasm from "vite-plugin-wasm";

import shikiConfig from "./src/utils/shiki";

const playgroundSidebarEntry = {
    label: 'Playground',
    link: '/playground',
    translations: { de: 'Spielplatz' },
};

const navLinks = [playgroundSidebarEntry];

// https://astro.build/config
export default defineConfig({
	site: "https://shulkerscript.hoelting.dev",
	integrations: [
        react(),
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
			plugins: [starlightUtils({
                navLinks: {
                    leading: {
                        useSidebarLabelled: "leadingNavLinks",
                    },
                },
            }),
            // starlightLinksValidator({
			// 	errorOnFallbackPages: false,
			// })
            ],
			expressiveCode: {
				shiki: shikiConfig,
			},
			components: {
                PageTitle: "./src/components/override/PageTitle.astro",
                ContentPanel: "./src/components/override/ContentPanel.astro",
                Pagination: "./src/components/override/Pagination.astro",
				SocialIcons: './src/components/override/SocialIcons.astro',
			},
			sidebar: [
                {
                    label: "leadingNavLinks",
                    items: navLinks,
                },
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
                    label: "More",
                    translations: {
                        de: "Mehr",
                    },
                    items: [
                        {
                            label: "Roadmap",
                            link: "/roadmap",
                            translations: {
                                de: "Zukunftspläne",
                            },
                        },
                        {
                            label: 'Differences to other languages',
                            link: '/differences',
                            translations: {
                                de: 'Unterschiede zu anderen Sprachen',
                            },
                        },
                        {
                            ...playgroundSidebarEntry,
                            badge: {
                                text: "WIP",
                                variant: "caution",
                            },
                        },
                    ],
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
    vite: {
        plugins: [
            wasm(),
        ],
    }
});
