import React, { useEffect, useState } from "react";
import Editor, { useMonaco, type Monaco } from "@monaco-editor/react";
import FileView from "./playground/FileView";

import "@styles/playground.scss";

import mainFileContent from "@assets/playground/main.shu?raw";
import Header from "./playground/Header";

export type File = {
    language?: string;
    content: string;
};
export type Directory = {
    dirs?: { [key: string]: Directory };
    files?: { [key: string]: File };
};
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export default function Playground() {
    const rootDir: Directory = {
        dirs: {
            src: {
                files: {
                    "main.shu": {
                        content: mainFileContent,
                    },
                },
            },
        },
        files: {
            "pack.toml": {
                content: "pack.toml content",
                language: "toml",
            },
        },
    };

    const [fileName, setFileName] = useState("src/main.shu");
    const file = getFile(rootDir, fileName)!;

    const monaco = useMonaco();
    useEffect(() => {
        if (monaco) {
            loadFiles(monaco, rootDir);
        }
    }, [monaco]);

    return (
        <>
            <main
                className="playground not-content"
                style={{
                    maxWidth: "95vw",
                    marginInline: "auto",
                    marginTop: "0.5cm",
                }}
            >
                <Header />
                <FileView
                    className="file-view"
                    root={rootDir}
                    fileName={fileName}
                    setSelectedFileName={setFileName}
                />
                <div className="editor">
                    <Editor
                        height="60vh"
                        theme="vs-dark"
                        path={fileName}
                        defaultLanguage={file.language}
                        defaultValue={file.content}
                    />
                </div>
            </main>
        </>
    );
}

function getFile(root: Directory, path: string): File | null {
    if (path.includes("/")) {
        let dir = root;
        const split = path.split("/");
        let last = split.pop()!;

        for (const dirName of split) {
            if (dir.dirs) {
                dir = dir.dirs[dirName];
            } else {
                return null;
            }
        }

        return dir.files?.[last] ?? null;
    }

    return root.files?.[path] ?? null;
}

function loadFiles(monaco: Monaco, dir: Directory, prefix = "") {
    for (const [name, d] of Object.entries(dir.dirs ?? {})) {
        loadFiles(monaco, d, prefix + name + "/");
    }

    for (const [name, file] of Object.entries(dir.files ?? {})) {
        loadFile(monaco, file, prefix + name);
    }
}

function loadFile(monaco: Monaco, file: File, name: string) {
    const uri = monaco.Uri.parse(name);
    if (!monaco.editor.getModel(uri)) {
        monaco.editor.createModel(file.content, file.language, uri);
    }
}
