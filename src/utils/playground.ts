export type PlaygroundLang = {
    header: PlaygroundHeaderLang;
    explorer: PlaygroundExplorerLang;
};

export type PlaygroundHeaderLang = {
    title: string;
    buttons: {
        save: string;
        reset: string;
        build: string;
        zip: string;
    };
};
export type PlaygroundExplorerLang = {
    title: string;
};

export type File = {
    language?: string;
    content: string;
};
export type Directory = {
    dirs?: { [key: string]: Directory };
    files?: { [key: string]: File };
};
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export function isPlaygroundPage(slug: string, lang?: string): boolean {
    return (
        slug === (!lang || lang == "en" ? "playground" : `${lang}/playground`)
    );
}
