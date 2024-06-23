import type {
    Directory,
    PlaygroundExplorerLang,
    SetState,
} from "@utils/playground";
import DirElement from "./DirElement";
import FileElement from "./FileElement";

export default function FileView({
    lang,
    root,
    selectedFileName,
    setSelectedFileName,
    deleteFile,
    renameFile,
    className,
}: {
    lang: PlaygroundExplorerLang;
    root: Directory;
    selectedFileName: string;
    setSelectedFileName: SetState<string>;
    deleteFile: (name: string) => void;
    renameFile: (oldName: string, newName: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            <h3>{lang.title}</h3>
            <div className="entries">
                {Object.entries(root.dirs ?? {}).map(([name, dir]) => {
                    return (
                        <DirElement
                            key={name}
                            name={name}
                            fullPath={name}
                            dir={dir}
                            selectedFileName={selectedFileName}
                            lang={lang}
                            setSelectedFileName={setSelectedFileName}
                            deleteFile={deleteFile}
                            renameFile={renameFile}
                        />
                    );
                })}
                {Object.entries(root.files ?? {}).map(([name, _]) => {
                    const isSelected = selectedFileName == name;
                    return (
                        <span key={name}>
                            <FileElement
                                name={name}
                                fullPath={name}
                                isSelected={isSelected}
                                lang={lang}
                                onClick={
                                    isSelected
                                        ? () => {}
                                        : () => setSelectedFileName(name)
                                }
                                onDelete={() => deleteFile(name)}
                                renameFile={renameFile}
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
}



