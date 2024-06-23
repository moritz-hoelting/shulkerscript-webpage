import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import type { PlaygroundExplorerLang } from "@utils/playground";

export default function AddFileDialog({
    open,
    handleClose,
    addFile,
    lang,
    defaultPath,
}: {
    open: boolean;
    defaultPath: string;
    lang: PlaygroundExplorerLang;
    handleClose: () => void;
    addFile: (filepath: string) => void;
}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                        (formData as any).entries()
                    );
                    const filepath = formJson.filepath;
                    if (addFile) {
                        addFile(filepath);
                    }
                    handleClose();
                },
            }}
        >
            <DialogTitle>{lang.menu.add}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {lang.menu.addPrompt.message}
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="filepath"
                    name="filepath"
                    label={lang.menu.addPrompt.label}
                    type="text"
                    fullWidth
                    variant="filled"
                    defaultValue={defaultPath}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{lang.menu.cancel}</Button>
                <Button type="submit">{lang.menu.add}</Button>
            </DialogActions>
        </Dialog>
    );
}
