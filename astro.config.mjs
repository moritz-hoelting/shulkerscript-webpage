import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import starlightLinksValidator from "starlight-links-validator";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import wasm from "vite-plugin-wasm";

import shikiConfig from "./src/utils/shiki";

const playgroundSidebarEntry = {
    label: "Playground",
    link: "/playground",
    translations: { de: "Spielplatz" },
};

const navLinks = [playgroundSidebarEntry];

// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        starlight({
            title: "ShulkerScript",
            logo: {
                src: "./src/assets/logo.webp",
                alt: "ShulkerScript Logo",
            },
            favicon: "/favicon.ico",
            description:
                "A simple and powerful scripting language for Minecraft datapacks.",
            social: {
                github: "https://github.com/moritz-hoelting/shulkerscript-cli",
            },
            tableOfContents: {
                minHeadingLevel: 1,
                maxHeadingLevel: 3,
            },
            defaultLocale: "root",
            locales: {
                root: {
                    label: "English",
                    lang: "en",
                },
                de: {
                    label: "Deutsch",
                    lang: "de",
                },
            },
            editLink: {
                baseUrl:
                    "https://github.com/moritz-hoelting/shulkerscript-webpage/edit/main",
            },
            customCss: ["./src/styles/style.css"],
            plugins: [
                starlightUtils({
                    navLinks: {
                        leading: {
                            useSidebarLabelled: "leadingNavLinks",
                        },
                    },
                }),
                starlightLinksValidator({
                    errorOnFallbackPages: false,
                    errorOnRelativeLinks: false,
                }),
            ],
            expressiveCode: {
                shiki: shikiConfig,
            },
            components: {
                PageTitle: "./src/components/override/PageTitle.astro",
                ContentPanel: "./src/components/override/ContentPanel.astro",
                Pagination: "./src/components/override/Pagination.astro",
            },
            sidebar: [
                {
                    label: "leadingNavLinks",
                    items: navLinks,
                },
                {
                    label: "Guides",
                    autogenerate: {
                        directory: "guides",
                    },
                    translations: {
                        de: "Anleitungen",
                    },
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
                            ...playgroundSidebarEntry,
                            badge: {
                                text: "WIP",
                                variant: "caution",
                            },
                        },
                    ],
                },
                {
                    label: "Reference",
                    autogenerate: {
                        directory: "reference",
                    },
                    collapsed: true,
                    translations: {
                        de: "Referenz",
                    },
                },
            ],
        }),
    ],
    vite: {
        plugins: [
            wasm(),
        ],
    }
});
