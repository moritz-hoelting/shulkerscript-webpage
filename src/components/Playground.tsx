import React, { useEffect, useState } from "react";
import { useMonaco, type Monaco } from "@monaco-editor/react";
import { useImmer, type Updater } from "use-immer";

import "@styles/playground.scss";

import mainFileContent from "@assets/playground/main.shu?raw";
import packTomlContent from "@assets/playground/pack.toml?raw";
import FileView from "./playground/FileView";
import Editor from "./playground/Editor";
import Header from "./playground/Header";

import initWasm, {
    compile,
    compileZip,
} from "@wasm/webcompiler/pkg/webcompiler";

export type File = {
    language?: string;
    content: string;
};
export type Directory = {
    dirs?: { [key: string]: Directory };
    files?: { [key: string]: File };
};
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const FILE_STORAGE_KEY = "playground-files";
const DEFAULT_FILES = {
    dirs: {
        src: {
            files: {
                "main.shu": {
                    content: mainFileContent,
                    language: "shulkerscript",
                },
            },
        },
        dist: {},
    },
    files: {
        "pack.toml": {
            content: packTomlContent,
            language: "toml",
        },
    },
};

export default function Playground() {
    initWasm().catch((err) => {
        console.error(err);
    });

    const [rootDir, updateRootDir] = useImmer(
        getStorageOrDefault(FILE_STORAGE_KEY, DEFAULT_FILES) as Directory
    );

    const [fileName, setFileName] = useState("src/main.shu");
    const file = getFile(rootDir, fileName);

    const onBuild = () => {
        if (monaco) {
            const dist = JSON.parse(
                JSON.stringify(compile(getFiles(monaco)), jsonReplacer)
            );
            const withRoot = {
                dirs: {
                    dist: dist,
                },
            } as Directory;
            loadFiles(monaco, updateRootDir, withRoot);
        } else {
            console.error("monaco has not loaded");
        }
    };
    const onZip = () => {
        if (monaco) {
            const data =
                "data:application/zip;base64," + compileZip(getFiles(monaco));
            const a = document.createElement("a");
            a.href = data;
            a.download = "shulkerscript-pack.zip";
            a.click();
        } else {
            console.error("monaco has not loaded");
        }
    };
    const onSave = () => {
        if (monaco) {
            const currentFiles = getFiles(monaco);
            updateRootDir((dir) => {
                dir.dirs = currentFiles.dirs;
                dir.files = currentFiles.files;
            });
            window.localStorage.setItem(
                FILE_STORAGE_KEY,
                JSON.stringify(currentFiles)
            );
        }
    };
    const onReset = () => {
        if (monaco) {
            monaco.editor.getModels().forEach((model) => {
                if (model.uri.path != "/src/main.shu") {
                    model.dispose();
                } else {
                    model.setValue(mainFileContent);
                }
            });

            updateRootDir((dir) => {
                dir.dirs = DEFAULT_FILES.dirs;
                dir.files = DEFAULT_FILES.files;
            });

            loadFiles(monaco, updateRootDir, DEFAULT_FILES);
            setFileName("src/main.shu");
        }
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
                <Header
                    onSave={onSave}
                    onReset={onReset}
                    onBuild={onBuild}
                    onZip={onZip}
                />
                <FileView
                    className="file-view"
                    root={rootDir}
                    fileName={fileName}
                    setSelectedFileName={setFileName}
                />
                <Editor fileName={fileName} file={file ?? undefined} />
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

            dir = dir.dirs[part];
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

function loadFiles(
    monaco: Monaco,
    updater: Updater<Directory>,
    dir: Directory,
    prefix = ""
) {
    for (const [name, d] of Object.entries(dir.dirs ?? {})) {
        loadFiles(monaco, updater, d, prefix + name + "/");
        updater((dir) => {
            let current = dir;
            for (const part of [
                ...prefix.split("/").filter((s) => s !== ""),
                name,
            ]) {
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

function loadFile(
    monaco: Monaco,
    updater: Updater<Directory>,
    file: File,
    name: string
) {
    const uri = monaco.Uri.parse(name);
    if (!monaco.editor.getModel(uri)) {
        monaco.editor.createModel(file.content, file.language, uri);
    }
    updater((dir) => {
        if (dir) {
            let current = dir;
            const parts = name.split("/").filter((s) => s !== "");
            const last = parts.pop()!;
            for (const part of parts) {
                if (!current.dirs) {
                    current.dirs = {};
                }
                if (!current.dirs[part]) {
                    current.dirs[part] = {};
                }
                current = current.dirs[part];
            }
            if (!current.files) {
                current.files = {};
            }
            current.files[last] = file;
        }
    });
}

function getStorageOrDefault(key: string, def: any) {
    const item = window.localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    } else {
        return def;
    }
}

function jsonReplacer(key: any, value: any): any {
    if (value instanceof Map) {
        const res: { [key: string]: any } = {};
        for (const [k, v] of value.entries()) {
            res[k] = v;
        }
        return res;
    } else {
        return value;
    }
}
