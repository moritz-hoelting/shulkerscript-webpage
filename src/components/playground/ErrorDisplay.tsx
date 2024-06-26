import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ErrorDisplay({
    error,
    setError,
}: {
    error: string | null;
    setError: (error: string | null) => void;
}) {
    return (
        <Dialog open={error !== null} onClose={() => setError(null)}>
            <DialogTitle>Error during compilation!</DialogTitle>
            <DialogContent>
                <div
                    style={{
                        backgroundColor: "black",
                        padding: "15px",
                        borderRadius: "15px",
                        fontSize: "1.2em",
                    }}
                >
                    <code
                        style={{
                            whiteSpace: "break-spaces",
                            fontFamily: "monospace",
                        }}
                        dangerouslySetInnerHTML={{ __html: error ?? "" }}
                    ></code>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setError(null)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
