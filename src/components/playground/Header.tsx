import SplitButton from "./SplitButton";

export default function Header({onBuild, onZip}: {onBuild: () => void; onZip: () => void;}){

    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5cm",
        }}>
            <h1 id="_top">Playground</h1>
            <SplitButton onClick={onBuild} options={[["Download zip", onZip]]}>Build</SplitButton>
        </header>
    );
}
