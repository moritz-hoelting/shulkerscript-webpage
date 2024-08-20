import { shulkerscriptGrammar } from "./shulkerscript-grammar";
import { mcfunctionGrammar } from "./mcfunction-grammar";
import { mcscriptGrammar } from "./mcscript-grammar";

const config = {
    langs: [
        shulkerscriptGrammar,
        mcfunctionGrammar,
        mcscriptGrammar,
    ],
};

export default config;
