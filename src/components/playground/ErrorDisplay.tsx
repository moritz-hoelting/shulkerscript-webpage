import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { PlaygroundErrorDisplayLang } from "@utils/playground";

export default function ErrorDisplay({
    lang,
    error,
    setError,
}: {
    lang: PlaygroundErrorDisplayLang;
    error: string | null;
    setError: (error: string | null) => void;
}) {
    return (
        <Dialog open={error !== null} onClose={() => setError(null)}>
            <DialogTitle>{lang.title}</DialogTitle>
            <DialogContent>
                <div className="error-terminal-display">
                    <code
                        dangerouslySetInnerHTML={{ __html: error ?? "" }}
                    ></code>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setError(null)}>
                    {lang.buttons.close}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
