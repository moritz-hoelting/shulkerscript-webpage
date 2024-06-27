export type PlaygroundLang = {
    header: PlaygroundHeaderLang;
    explorer: PlaygroundExplorerLang;
    errorDisplay: PlaygroundErrorDisplayLang;
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
    menu: {
        add: string;
        addPrompt: {
            message: string;
            label: string;
        }
        rename: string;
        renamePrompt: {
            message: string;
            label: string;
        }
        delete: string;
        cancel: string;
    }
};
export type PlaygroundErrorDisplayLang = {
    title: string;
    buttons: {
        close: string;
    }
}

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
