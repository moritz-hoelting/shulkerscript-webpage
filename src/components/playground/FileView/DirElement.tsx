import type {
    Directory,
    PlaygroundExplorerLang,
    SetState,
} from "@utils/playground";
import React, { useState } from "react";
import {
    GoChevronDown as ChevDown,
    GoChevronRight as ChevRight,
} from "react-icons/go";
import FileElement from "./FileElement";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddFileDialog from "./AddFileDialog";

export default function DirElement({
    name,
    fullPath,
    dir: currentDir,
    collapsed: pCollapsed,
    selectedFileName,
    lang,
    setSelectedFileName,
    addFile,
    deleteFile,
    renameFile,
}: {
    name: string;
    fullPath: string;
    dir: Directory;
    collapsed?: boolean;
    selectedFileName: string;
    lang: PlaygroundExplorerLang;
    setSelectedFileName: SetState<string>;
    addFile: (name: string) => void;
    deleteFile: (name: string) => void;
    renameFile: (oldName: string, newName: string) => void;
}) {
    const [collapsed, setCollapsed] = useState(pCollapsed ?? false);

    const chevStyles: React.CSSProperties = {
        marginBottom: "-2px",
    };

    const hasChildren =
        Object.keys(currentDir.dirs ?? {}).length > 0 ||
        Object.keys(currentDir.files ?? {}).length > 0;

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

    const onDelete = () => {
        deleteFile(fullPath + "/");
    };

    return (
        <div key={name} className="dir">
            <button
                style={{ display: "block" }}
                onClick={() => setCollapsed(!collapsed)}
                onContextMenu={handleContext}
            >
                {collapsed ? (
                    <ChevRight
                        aria-description="collapsed"
                        style={chevStyles}
                    />
                ) : (
                    <ChevDown aria-description="expanded" style={chevStyles} />
                )}{" "}
                {name + "/" + (collapsed && hasChildren ? "..." : "")}
            </button>
            <Menu
                anchorEl={anchorEl}
                open={contextOpen}
                onClose={handleContextClose}
            >
                <MenuItem
                    disabled={(fullPath + "/").startsWith("dist/")}
                    onClick={() => {
                        handleContextClose();
                        setAddOpen(true);
                    }}
                >
                    {lang.menu.add}
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleContextClose();
                        onDelete?.();
                    }}
                >
                    {lang.menu.delete}
                </MenuItem>
            </Menu>
            <AddFileDialog
                lang={lang}
                defaultPath={fullPath + "/"}
                open={addOpen}
                addFile={addFile}
                handleClose={handleAddClose}
            />
            <div style={{ marginLeft: "0.5cm" }} className="dirChildren">
                {collapsed ? null : (
                    <div>
                        {Object.entries(currentDir.dirs ?? {}).map(
                            ([dirname, dir]) => {
                                return (
                                    <DirElement
                                        key={dirname}
                                        name={dirname}
                                        fullPath={fullPath + "/" + dirname}
                                        dir={dir}
                                        selectedFileName={selectedFileName}
                                        lang={lang}
                                        addFile={addFile}
                                        setSelectedFileName={
                                            setSelectedFileName
                                        }
                                        deleteFile={deleteFile}
                                        renameFile={renameFile}
                                    />
                                );
                            }
                        )}
                        {Object.entries(currentDir.files ?? {}).map(
                            ([currentName, _]) => {
                                const currentPath =
                                    fullPath + "/" + currentName;
                                return (
                                    <FileElement
                                        key={currentName}
                                        fullPath={currentPath}
                                        name={currentName}
                                        isSelected={
                                            selectedFileName == currentPath
                                        }
                                        lang={lang}
                                        onClick={() =>
                                            setSelectedFileName(currentPath)
                                        }
                                        onDelete={() => deleteFile(currentPath)}
                                        renameFile={renameFile}
                                    />
                                );
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
