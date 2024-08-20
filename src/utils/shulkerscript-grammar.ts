import type { LanguageInput } from "shiki";

export const shulkerscriptGrammar: LanguageInput = {
    name: "shulkerscript",
    aliases: ["shu"],
    displayName: "ShulkerScript",
    fileTypes: ["shu"],
    scopeName: "source.shulkerscript",
    patterns: [
        {
            include: "#namespaceKeyword",
        },
        {
            include: "#functionContents",
        },
        {
            include: "#functionDeclaration",
        },
        {
            include: "#functionAnnotation",
        },
        {
            include: "#importStatement",
        }
    ],
    repository: {
        "$base": {},
        "$self": {},
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
                { include: "#executeKeyword" },
                { include: "#elseKeyword" },
                { include: "#runKeyword" },
                { include: "#functionCall" },
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
        namespaceKeyword: {
            name: "keyword.other.namespace.shulkerscript",
            match: "\\bnamespace\\b",
        },
        functionDeclaration: {
            begin: "^\\s*(pub\\s)?(fn)\\s+(\\w+)\\(\\s*\\)\\s*{",
            end: "}",
            captures: {
                1: {
                    name: "keyword.control.public.shulkerscript"
                },
                2: {
                    name: "keyword.control.function.shulkerscript",
                },
                3: {
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
        functionCall: {
            match: "(\\w+)\\s*\\(\\s*(?:\\w+\\s*)?\\)",
            captures: {
                1: {
                    name: "entity.name.function.shulkerscript",
                },
            }
        },
        binaryOperator: {
            name: "punctuation.operator.binary.shulkerscript",
            match: "(&&|\\|\\|)",
        },
        executeKeyword: {
            name: "keyword.control.execute.shulkerscript",
            match: "\\b(if|align|as|asat|at|facing|in|on|positioned|rotated|store|summon)\\b",
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
                    name: "keyword.other.commandliteral.shulkerscript",
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
        importStatement: {
            name: "keyword.import.other.shulkerscript",
            begin: "from\\s",
            end: "import\\s(\\w+(?:\\s?,\\s?(?:\\w+))*)\\s?,?\\s?",
            captures: {
                1: {
                    name: "entity.name.function.shulkerscript"
                },
            },
            patterns: [{ include: "#stringLiteral" }]
        }
    },
};