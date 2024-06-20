import type { File } from "@components/Playground";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { getHighlighter, type Highlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { useEffect, useState } from "react";
import darkPlus from "tm-themes/themes/dark-plus.json";

import { shulkerscriptGrammar } from "@utils/shulkerscript-grammar";
import { mcfunctionGrammar } from "@utils/mcfunction-grammar";

export default function Editor({
    fileName,
    file,
}: {
    fileName: string;
    file: File;
}) {
    const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

    const monaco = useMonaco();
    useEffect(() => {
        if (monaco) {
            if (highlighter == null) {
                getHighlighter({
                    themes: [darkPlus as any],
                    langs: ["toml", shulkerscriptGrammar, mcfunctionGrammar],
                }).then((highlighter) => {
                    setHighlighter(highlighter);
                });
            } else {
                shikiToMonaco(highlighter, monaco);
            }

            monaco.languages.register({ id: "toml" });
            monaco.languages.register({ id: "shulkerscript" });
            monaco.languages.register({ id: "mcfunction" });
        }
    }, [monaco]);
    useEffect(() => {
        if (highlighter != null) {
            shikiToMonaco(highlighter, monaco);
        }
    }, [highlighter]);

    return (
        <div className="editor">
            <MonacoEditor
                height="70vh"
                theme="vs-dark"
                path={fileName}
                defaultLanguage={file.language}
                defaultValue={file.content}
            />
        </div>
    );
}
