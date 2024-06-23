import { useEffect, useState } from "react";
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
import type { Directory, File, PlaygroundLang } from "@utils/playground";

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

export default function Playground({ lang }: { lang: PlaygroundLang }) {
    initWasm().catch((err) => {
        console.error(err);
    });

    const [rootDir, updateRootDir] = useImmer(
        getStorageOrDefault(FILE_STORAGE_KEY, DEFAULT_FILES) as Directory
    );

    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [fileName, setFileName] = useState("src/main.shu");
    const file = getFile(rootDir, fileName);

    const onBuild = () => {
        if (monaco) {
            const compiled = compile(getFiles(monaco));
            if (compiled) {
                const dist = JSON.parse(JSON.stringify(compiled, jsonReplacer));
                const withRoot = {
                    dirs: {
                        dist: dist,
                    },
                } as Directory;
                loadFiles(monaco, updateRootDir, withRoot);
            } else {
                alert("Compilation failed");
            }
        } else {
            console.error("monaco has not loaded");
        }
    };
    const onZip = () => {
        if (monaco) {
            const zipped = compileZip(getFiles(monaco));
            if (zipped) {
                const data = "data:application/zip;base64," + zipped;
                const a = document.createElement("a");
                a.href = data;
                a.download = "shulkerscript-pack.zip";
                a.click();
            } else {
                alert("Compilation failed");
            }
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

    useEffect(() => {
        if (monaco) {
            let isReadOnly = fileName.startsWith("dist/");
            monaco.editor.getEditors().forEach((e) =>
                e.updateOptions({
                    readOnly: isReadOnly,
                    readOnlyMessage: {
                        value: "Generated files are read-only",
                    },
                })
            );
        }
    }, [fileName]);

    useEffect(() => {
        const root = document.querySelector(":root") as HTMLElement;
        if (root) {
            function reactToThemeChange() {
                const selectedTheme = root.getAttribute("data-theme");
                if (selectedTheme !== theme && selectedTheme !== null) {
                    setTheme(selectedTheme as "light" | "dark");
                }
            }
            reactToThemeChange();

            root.onchange = () => {
                reactToThemeChange();
            };
        }
    });

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
                    lang={lang.header}
                    onSave={onSave}
                    onReset={onReset}
                    onBuild={onBuild}
                    onZip={onZip}
                />
                <FileView
                    className="file-view"
                    root={rootDir}
                    selectedFileName={fileName}
                    setSelectedFileName={setFileName}
                    addFile={(name) => {
                        if (monaco) {
                            loadFile(
                                monaco,
                                updateRootDir,
                                { content: "" },
                                name
                            );
                        }
                    }}
                    deleteFile={(name) => {
                        if (monaco) {
                            if (name.endsWith("/")) {
                                deleteDir(monaco, updateRootDir, name);
                            } else {
                                deleteFile(monaco, updateRootDir, name);
                                if (name === fileName) {
                                    const newFile = monaco.editor
                                        .getModels()[0]
                                        ?.uri.path.slice(1);
                                    if (newFile) {
                                        setFileName(newFile);
                                    } else {
                                        setFileName("");
                                    }
                                }
                            }
                        }
                    }}
                    renameFile={(oldName, newName) => {
                        if (monaco) {
                            renameFile(monaco, updateRootDir, oldName, newName);
                            if (oldName === fileName) {
                                setFileName(newName);
                            }
                        }
                    }}
                    lang={lang.explorer}
                />
                <Editor
                    fileName={fileName}
                    file={file ?? undefined}
                    theme={theme}
                />
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
    let extension = name.split(".").pop()!;
    let lang = undefined;
    if (extension === "shu") {
        lang = "shulkerscript";
    } else if (extension === "toml") {
        lang = "toml";
    } else if (extension === "mcfunction") {
        lang = "mcfunction";
    } else if (extension === "json") {
        lang = "json";
    }
    const uri = monaco.Uri.parse(name);
    if (!monaco.editor.getModel(uri)) {
        monaco.editor.createModel(file.content, lang, uri);
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
            current.files[last] = {
                content: file.content,
                language: lang,
            };
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

function deleteFile(monaco: Monaco, updater: Updater<Directory>, name: string) {
    const uri = monaco.Uri.parse(name);
    const model = monaco.editor.getModel(uri);
    if (model) {
        model.dispose();
    }
    updater((dir) => {
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
        if (current.files) {
            delete current.files[last];
        }
    });
}

function deleteDir(monaco: Monaco, updater: Updater<Directory>, path: string) {
    const parts = path.split("/").filter((s) => s !== "");
    const last = parts.pop()!;

    let current = getFiles(monaco);
    for (const part of parts) {
        if (!current.dirs) {
            current.dirs = {};
        }
        if (!current.dirs[part]) {
            current.dirs[part] = {};
        }
        current = current.dirs[part];
    }

    if (current.dirs) {
        for (const [name, _] of Object.entries(current.dirs ?? {})) {
            deleteDir(monaco, updater, path + name + "/");
        }
        for (const [name, _] of Object.entries(current.files ?? {})) {
            deleteFile(monaco, updater, path + name);
        }

        delete current.dirs[last];
    }
    
    updater((dir) => {
        let current = dir;
        for (const part of parts) {
            if (!current.dirs) {
                current.dirs = {};
            }
            if (!current.dirs[part]) {
                current.dirs[part] = {};
            }
            current = current.dirs[part];
        }

        if (current.dirs) {
            delete current.dirs[last];
        }
    });
}

function renameFile(
    monaco: Monaco,
    updater: Updater<Directory>,
    oldName: string,
    newName: string
) {
    const file = getFile(getFiles(monaco), oldName);
    if (file) {
        deleteFile(monaco, updater, oldName);
        loadFile(monaco, updater, file, newName);
    }
}
