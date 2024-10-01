import type {
    Directory,
    PlaygroundExplorerLang,
    SetState,
} from "@utils/playground";
import DirElement from "./DirElement";
import FileElement from "./FileElement";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import AddFileDialog from "./AddFileDialog";

export default function FileView({
    lang,
    root,
    selectedFileName,
    setSelectedFileName,
    addFile,
    deleteFile,
    renameFile,
    className,
}: {
    lang: PlaygroundExplorerLang;
    root: Directory;
    selectedFileName: string;
    setSelectedFileName: SetState<string>;
    addFile: (name: string) => void;
    deleteFile: (name: string) => void;
    renameFile: (oldName: string, newName: string) => void;
    className?: string;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const contextOpen = Boolean(anchorEl);
    const handleContext = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleContextClose = () => {
        setAnchorEl(null);
    };

    const [addOpen, setAddOpen] = React.useState(false);

    const handleAddClose = () => {
        setAddOpen(false);
    };

    return (
        <div className={className}>
            <h3 onContextMenu={handleContext}>{lang.title}</h3>
            <Menu
                anchorEl={anchorEl}
                open={contextOpen}
                onClose={handleContextClose}
            >
                <MenuItem
                    onClick={() => {
                        handleContextClose();
                        setAddOpen(true);
                    }}
                >
                    {lang.menu.add}
                </MenuItem>
            </Menu>
            <AddFileDialog lang={lang} defaultPath="" addFile={addFile} handleClose={handleAddClose} open={addOpen} />
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
                            addFile={addFile}
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



