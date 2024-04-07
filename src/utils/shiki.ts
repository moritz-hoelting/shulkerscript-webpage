import type { PluginShikiOptions } from "@astrojs/starlight/expressive-code";
import { shulkerscriptGrammar } from "./shulkerscript-grammar";

const config: PluginShikiOptions = {
    langs: [
        shulkerscriptGrammar,
    ],
};

export default config;
