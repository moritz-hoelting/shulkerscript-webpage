
export const shulkerscriptGrammar = {
    name: "shulkerscript",
    aliases: ["shu"],
    displayName: "ShulkerScript",
    fileTypes: ["shu"],
    scopeName: "source.shulkerscript",
    patterns: [
        {
            include: "#functionContents",
        },
        {
            include: "#functionDeclaration",
        },
        {
            include: "#functionAnnotation",
        },
    ],
    repository: {
        // Groupings
        functionContents: {
            patterns: [
                { include: "#docComment" },
                { include: "#lineComment" },
                { include: "#blockComment" },
                { include: "#commandLiteral" },
                { include: "#lua" },
                { include: "#groupBlock" },
                { include: "#stringLiteral" },
                { include: "#binaryOperator" },
                { include: "#ifKeyword" },
                { include: "#elseKeyword" },
                { include: "#runKeyword" },
            ],
        },

        // Components
        lineComment: {
            name: "comment.line.shulkerscript",
            match: "//.*$",
        },
        blockComment: {
            name: "comment.block.shulkerscript",
            begin: "/\\*",
            end: "\\*/",
        },
        docComment: {
            name: "comment.documentation.shulkerscript",
            match: "///.*$",
        },
        functionDeclaration: {
            name: "entity.name.function.shulkerscript",
            begin: "^\\s*(fn)\\s+(\\w+)\\(\\s*\\)\\s*{",
            end: "}",
            captures: {
                1: {
                    name: "keyword.control.function.shulkerscript",
                },
                2: {
                    name: "entity.name.function.shulkerscript",
                },
            },
            patterns: [{ include: "#functionContents" }],
        },
        functionAnnotation: {
            name: "entity.annotation.function.shulkerscript",
            match: '(#\\[)(\\w+)(?:\\s*=\\s*"[^"]+")?(\\])',
            captures: {
                1: {
                    name: "keyword.operator.annotation.shulkerscript",
                },
                2: {
                    name: "entity.annotation.function.shulkerscript",
                },
                3: {
                    name: "keyword.operator.annotation.shulkerscript",
                },
            },
        },
        binaryOperator: {
            name: "punctuation.operator.binary.shulkerscript",
            match: "(&&|\\|\\|)",
        },
        ifKeyword: {
            name: "keyword.control.if.shulkerscript",
            match: "\\bif\\b",
        },
        elseKeyword: {
            name: "keyword.control.else.shulkerscript",
            match: "\\belse\\b",
        },
        runKeyword: {
            name: "keyword.control.run.shulkerscript",
            match: "\\brun\\b",
        },
        commandLiteral: {
            name: "string.commandliteral.shulkerscript",
            match: "^\\s*(/\\w+)(.*)$",
            captures: {
                1: {
                    name: "keyword.operator.literalcommand.shulkerscript",
                },
                2: {
                    name: "string.command.shulkerscript",
                },
            },
        },
        stringLiteral: {
            name: "string.quoted.double.shulkerscript",
            begin: '"',
            end: '"',
            patterns: [
                {
                    name: "constant.character.escape.shulkerscript",
                    match: "\\\\.",
                },
            ],
        },
        lua: {
            name: "entity.lua.shulkerscript",
            begin: "(lua)\\s*\\(\\s*\\)\\s*{",
            end: "}",
            beginCaptures: {
                1: {
                    name: "keyword.control.lua.shulkerscript",
                },
            },
            patterns: [{ include: "source.lua" }],
        },
        groupBlock: {
            name: "entity.group.shulkerscript",
            begin: "^\\s*(group)\\s*{",
            end: "}",
            captures: {
                1: {
                    name: "keyword.control.group.shulkerscript",
                },
                2: {
                    name: "entity.name.group.shulkerscript",
                },
            },
            patterns: [{ include: "#functionContents" }],
        },
    },
};