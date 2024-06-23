import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem,
    TextField,
} from "@mui/material";
import type { PlaygroundExplorerLang } from "@utils/playground";
import React from "react";
import { useState } from "react";

export default function FileElement({
    name,
    fullPath,
    isSelected,
    lang,
    onClick,
    renameFile,
    onDelete,
}: {
    name: string;
    fullPath: string;
    isSelected: boolean;
    lang: PlaygroundExplorerLang;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    renameFile?: (oldName: string, newName: string) => void;
    onDelete?: React.MouseEventHandler<HTMLLIElement>;
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
    const [renameOpen, setRenameOpen] = React.useState(false);

    const handleRenameClose = () => {
        setRenameOpen(false);
    };

    return (
        <div className="file">
            <button
                onClick={onClick}
                onContextMenu={handleContext}
                className={"file" + (isSelected ? " selected" : "")}
            >
                {name}
            </button>
            <Menu
                anchorEl={anchorEl}
                open={contextOpen}
                onClose={handleContextClose}
            >
                <MenuItem
                    onClick={() => {
                        handleContextClose();
                        setRenameOpen(true);
                    }}
                    disabled={fullPath.startsWith("dist/")}
                >
                    {lang.menu.rename}
                </MenuItem>
                <MenuItem
                    onClick={(ev) => {
                        handleContextClose();
                        onDelete?.(ev);
                    }}
                >
                    {lang.menu.delete}
                </MenuItem>
            </Menu>
            <Dialog
                open={renameOpen}
                onClose={handleRenameClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(
                            (formData as any).entries()
                        );
                        const filepath = formJson.filepath;
                        if (renameFile) {
                            renameFile(fullPath, filepath);
                        }
                        handleRenameClose();
                    },
                }}
            >
                <DialogTitle>
                    {lang.menu.rename} - {fullPath}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {lang.menu.renamePrompt.message}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="filepath"
                        name="filepath"
                        label={lang.menu.renamePrompt.label}
                        type="text"
                        fullWidth
                        variant="filled"
                        defaultValue={fullPath}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRenameClose}>
                        {lang.menu.cancel}
                    </Button>
                    <Button type="submit">{lang.menu.rename}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
