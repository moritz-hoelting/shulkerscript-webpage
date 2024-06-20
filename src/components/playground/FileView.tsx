import type { Directory, SetState } from "@components/Playground";
import React, { useState } from "react";
import {
    GoChevronDown as ChevDown,
    GoChevronRight as ChevRight,
} from "react-icons/go";

export default function FileView({
    root,
    fileName,
    setSelectedFileName,
    className,
}: {
    root: Directory;
    fileName: string;
    setSelectedFileName: SetState<string>;
    className?: string;
}) {
    return (
        <div className={className}>
            <h3>Explorer</h3>
            <div className="entries">
                {Object.entries(root.dirs ?? {}).map(([name, dir]) => {
                    return (
                        <DirElement
                            key={name}
                            name={name}
                            dir={dir}
                            fileName={fileName.slice(name.length + 1)}
                            setSelectedFileName={setSelectedFileName}
                        />
                    );
                })}
                {Object.entries(root.files ?? {}).map(([name, _]) => {
                    return (
                        <span key={name}>
                            <FileElement
                                name={name}
                                disabled={fileName == name}
                                onClick={() => setSelectedFileName(name)}
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function FileElement({
    name,
    disabled,
    onClick,
}: {
    name: string;
    disabled: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button disabled={disabled} onClick={onClick} className="file">
            {name}
        </button>
    );
}

function DirElement({
    name,
    dir: currentDir,
    collapsed: pCollapsed,
    fileName,
    setSelectedFileName,
}: {
    name: string;
    dir: Directory;
    collapsed?: boolean;
    fileName: string;
    setSelectedFileName: SetState<string>;
}) {
    const [collapsed, setCollapsed] = useState(pCollapsed ?? false);

    const modSetSelectedFileName: SetState<string> = (selected) => {
        setSelectedFileName(name + "/" + selected);
    };

    const chevStyles: React.CSSProperties = {
        marginBottom: "-2px",
    };

    const hasChildren =
        Object.keys(currentDir.dirs ?? {}).length > 0 ||
        Object.keys(currentDir.files ?? {}).length > 0;

    return (
        <div key={name} className="dir">
            <button
                style={{ display: "block" }}
                onClick={() => setCollapsed(!collapsed)}
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
            <div style={{ marginLeft: "0.5cm" }} className="dirChildren">
                {collapsed ? null : (
                    <div>
                        {Object.entries(currentDir.dirs ?? {}).map(
                            ([dirname, dir]) => {
                                return (
                                    <DirElement
                                        key={dirname}
                                        name={dirname}
                                        dir={dir}
                                        fileName={fileName.slice(
                                            dirname.length + 1
                                        )}
                                        setSelectedFileName={
                                            modSetSelectedFileName
                                        }
                                    />
                                );
                            }
                        )}
                        {Object.entries(currentDir.files ?? {}).map(
                            ([currentName, _]) => {
                                return (
                                    <FileElement
                                        key={currentName}
                                        name={currentName}
                                        disabled={fileName == currentName}
                                        onClick={() =>
                                            modSetSelectedFileName(currentName)
                                        }
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
