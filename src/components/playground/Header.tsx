import DropdownButton from "./DropdownButton";

export default function Header({
    onSave,
    onReset,
    onBuild,
    onZip,
}: {
    onSave: () => void;
    onReset: () => void;
    onBuild: () => void;
    onZip: () => void;
}) {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5cm",
            }}
        >
            <h1 id="_top">Playground</h1>
            <div className="buttons" style={{ height: "100%" }}>
                <DropdownButton
                    style={{ height: "100%", marginRight: "0.5cm"}}
                    visible={[["Save", onSave]]}
                    options={[["Reset", onReset]]}
                />
                <DropdownButton
                    style={{ height: "100%" }}
                    visible={[["Build", onBuild]]}
                    options={[["Download zip", onZip]]}
                />
            </div>
        </header>
    );
}
