import { mcfunctionGrammar } from "./mcfunction-grammar";
import { mcscriptGrammar } from "./mcscript-grammar";
import { shulkerscriptGrammar } from "./shulkerscript-grammar";

const config = {
    langs: [
        shulkerscriptGrammar,
        mcfunctionGrammar,
        mcscriptGrammar,
        "lua",
    ],
};

export default config;
