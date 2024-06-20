import type { PluginShikiOptions } from "@astrojs/starlight/expressive-code";
import { shulkerscriptGrammar } from "./shulkerscript-grammar";
import { mcfunctionGrammar } from "./mcfunction-grammar";

const config: PluginShikiOptions = {
    langs: [
        shulkerscriptGrammar,
        mcfunctionGrammar,
    ],
};

export default config;
