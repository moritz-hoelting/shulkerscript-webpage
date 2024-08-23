import type { PlaygroundHeaderLang } from "@utils/playground";
import DropdownButton from "./DropdownButton";

export default function Header({
    lang,
    onSave,
    onReset,
    onBuild,
    onZip,
}: {
    lang: PlaygroundHeaderLang;
    onSave: () => void;
    onReset: () => void;
    onBuild: () => void;
    onZip: () => void;
}) {
    return (
        <header>
            <h1 id="_top">{lang.title}</h1>
            <div className="buttons" style={{ height: "100%" }}>
                <DropdownButton
                    style={{ height: "100%", marginRight: "0.5cm" }}
                    visible={[[lang.buttons.save, onSave]]}
                    options={[[lang.buttons.reset, onReset]]}
                />
                <DropdownButton
                    style={{ height: "100%" }}
                    visible={[[lang.buttons.build, onBuild]]}
                    options={[[lang.buttons.zip, onZip]]}
                />
            </div>
        </header>
    );
}
