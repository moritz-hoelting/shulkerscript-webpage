import SplitButton from "./SplitButton";

export default function Header() {
    const clickBuild = () => {
        console.log("build");
    }
    const clickZip = () => {
        console.log("zip");
    }

    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5cm",
        }}>
            <h1 id="_top">Playground</h1>
            <SplitButton onClick={clickBuild} options={[["Download zip", clickZip]]}>Build</SplitButton>
        </header>
    );
}
