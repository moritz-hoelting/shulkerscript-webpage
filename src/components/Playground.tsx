import React, { useEffect, useState } from "react";
import { useMonaco, type Monaco } from "@monaco-editor/react";
import { useImmer, type ImmerHook, type Updater } from "use-immer"; 

import "@styles/playground.scss";

import mainFileContent from "@assets/playground/main.shu?raw";
import packTomlContent from "@assets/playground/pack.toml?raw";
import FileView from "./playground/FileView";
import Editor from "./playground/Editor";
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
    const [rootDir, updateRootDir] = useImmer({
        dirs: {
            src: {
                files: {
                    "main.shu": {
                        content: mainFileContent,
                        language: "shulkerscript",
                    },
                },
            },
            dist: {
                files: {
                    "test.mcfunction": {
                        content: "",
                        language: "mcfunction",
                    },
                },
            },
        },
        files: {
            "pack.toml": {
                content: packTomlContent,
                language: "toml",
            },
        },
    } as Directory);

    const [fileName, setFileName] = useState("src/main.shu");
    const file = getFile(rootDir, fileName)!;

    const onBuild: () => void = () => {
        if (monaco) {
            console.log(getFiles(monaco));
        } else {
            console.error("monaco has not loaded");
        }
    };
    const onZip: () => void = () => {
        if (monaco) {
            loadFile(monaco, updateRootDir, {content: "zip"}, "dist/pack.zip");
        } else {
        console.error("onZip not set");}
    };

    const monaco = useMonaco();
    useEffect(() => {
        if (monaco) {
            loadFiles(monaco, updateRootDir, rootDir);
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
                <Header onBuild={onBuild} onZip={onZip} />
                <FileView
                    className="file-view"
                    root={rootDir}
                    fileName={fileName}
                    setSelectedFileName={setFileName}
                />
                <Editor fileName={fileName} file={file} />
            </main>
        </>
    );
}

function getFiles(monaco: Monaco): Directory {
    const files: Directory = {};

    for (const model of monaco.editor.getModels()) {
        const parts = model.uri.path.slice(1).split("/");
        const name = parts.pop()!;

        let dir = files;
        for (const part of parts) {
            if (!dir.dirs) {
                dir.dirs = {};
            }
            if (!dir.dirs[part]) {
                dir.dirs[part] = {};
            }

            dir = dir.dirs[part].files ?? {};
        }

        if (!dir.files) {
            dir.files = {};
        }

        dir.files[name] = {
            content: model.getValue(),
            language: model.getLanguageId(),
        };
    }

    return files;
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

function loadFiles(monaco: Monaco, updater: Updater<Directory>, dir: Directory, prefix = "") {
    for (const [name, d] of Object.entries(dir.dirs ?? {})) {
        loadFiles(monaco, updater, d, prefix + name + "/");
        updater(dir => {
            let current = dir;
            for(const part of [...prefix.split("/").filter(s => s !== ""), name]) {
                if (!current.dirs) {
                    current.dirs = {};
                }
                current = current.dirs[part];
            }
        });
    }

    for (const [name, file] of Object.entries(dir.files ?? {})) {
        loadFile(monaco, updater, file, prefix + name);
    }
}

function loadFile(monaco: Monaco, updater: Updater<Directory>, file: File, name: string) {
    const uri = monaco.Uri.parse(name);
    if (!monaco.editor.getModel(uri)) {
        monaco.editor.createModel(file.content, file.language, uri);
    }
    updater(dir => {
        let current = dir;
        const parts = name.split("/").filter(s => s !== "");
        const last = parts.pop()!;
        for(const part of parts) {
            console.log(part);
            if (!current.dirs) {
                current.dirs = {};
            }
            current = current.dirs[part];
        }
        if (!current.files) {
            current.files = {};
        }
        current.files[last] = file;
    });
}


