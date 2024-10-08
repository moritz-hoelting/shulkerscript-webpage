import type { LanguageInput } from "shiki";

export const mcfunctionGrammar: LanguageInput = {
    name: "mcfunction",
    scopeName: "source.mcfunction",
    displayName: "McFunction",
    fileTypes: ["mcfunction"],
    patterns: [
        {
            include: "#comment",
        },
        {
            include: "#command",
        },
        {
            include: "#unknown",
        },
    ],
    repository: {
        "$base": {},
        "$self": {},
        comment: {
            patterns: [
                {
                    name: "meta.comment.block.mcfunction",
                    begin: "^[ \\t]*((#)([\\#\\>\\~\\!\\@\\$\\%\\^\\*]+)((.*)))$",
                    end: "^(?![ \\t]*#)",
                    beginCaptures: {
                        1: {
                            name: "comment.block.mcfunction",
                        },
                        2: {
                            name: "markup.list.mcfunction",
                        },
                        3: {
                            name: "markup.list.mcfunction",
                        },
                        4: {
                            name: "markup.bold.mcfunction",
                        },
                        5: {
                            name: "markup.list.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#comment.block",
                        },
                    ],
                },
                {
                    name: "meta.comment.line.mcfunction",
                    match: "^[ \\t]*(#.*)$",
                    captures: {
                        1: {
                            name: "comment.line.mcfunction",
                        },
                    },
                },
            ],
        },
        "comment.block": {
            patterns: [
                {
                    name: "meta.comment.block_line.mcfunction",
                    begin: "^[ \\t]*((#)[ \\t]*)",
                    end: "$",
                    beginCaptures: {
                        1: {
                            name: "comment.block.mcfunction",
                        },
                        2: {
                            name: "markup.list.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#comment.block.line",
                        },
                    ],
                },
            ],
        },
        "comment.block.line": {
            patterns: [
                {
                    name: "meta.comment.block.annotation.mcfunction",
                    match: "((\\@\\w*)\\b(.*))$",
                    captures: {
                        1: {
                            name: "comment.block.mcfunction",
                        },
                        2: {
                            name: "markup.heading.mcfunction",
                        },
                        3: {
                            name: "comment.block.mcfunction",
                        },
                    },
                },
                {
                    name: "meta.comment.block.heading.mcfunction",
                    match: "(([\\#\\>\\~\\!\\@\\$\\%\\^\\*]+)((.*)))$",
                    captures: {
                        1: {
                            name: "comment.block.mcfunction",
                        },
                        2: {
                            name: "markup.list.mcfunction",
                        },
                        3: {
                            name: "markup.bold.mcfunction",
                        },
                        4: {
                            name: "markup.list.mcfunction",
                        },
                    },
                },
                {
                    name: "meta.comment.block.text.mcfunction",
                    match: "(.*)$",
                    captures: {
                        1: {
                            name: "comment.block.mcfunction",
                        },
                    },
                },
            ],
        },
        command: {
            patterns: [
                {
                    name: "meta.command.mcfunction",
                    begin: "^\\s*([a-z_][a-z0-9_]*)[ \\n]",
                    end: "$",
                    beginCaptures: {
                        1: {
                            name: "keyword.control.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            begin: "(?<= )",
                            end: "[ \\n]",
                            contentName: "meta.command.token.mcfunction",
                            patterns: [
                                {
                                    include: "#command.tokens",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        unknown: {
            patterns: [
                {
                    name: "meta.unknown.mcfunction",
                    match: "^(.*)$",
                    captures: {
                        1: {
                            name: "invalid.illegal.mcfunction",
                        },
                    },
                },
            ],
        },
        "command.tokens": {
            patterns: [
                {
                    include: "#command.token.nbt_compound",
                },
                {
                    include: "#command.token.nbt_list",
                },
                {
                    include: "#command.token.selector_with_arguments",
                },
                {
                    include: "#command.token.selector_without_arguments",
                },
                {
                    include: "#command.token.block_predicate",
                },
                {
                    include: "#command.token.block_predicate_without_namespace",
                },
                {
                    include: "#command.token.resource_location",
                },
                {
                    include: "#command.token.tagged_resource_location",
                },
                {
                    include: "#command.token.range",
                },
                {
                    include: "#command.token.number",
                },
                {
                    include: "#command.token.coordinate",
                },
                {
                    include: "#command.token.boolean",
                },
                {
                    include: "#command.token.operation",
                },
                {
                    include: "#command.token.root_redirect",
                },
                {
                    include: "#command.token.greedy_parent",
                },
                {
                    include: "#command.token.literal",
                },
                {
                    include: "#command.token.uuid",
                },
                {
                    include: "#command.token.fakeplayer",
                },
                {
                    include: "#command.token.nbt_path",
                },
                {
                    include: "#command.token.quoted_string",
                },
                {
                    include: "#command.token.single_quoted_string",
                },
                {
                    include: "#command.token.unquoted_string",
                },
                {
                    include: "#command.token.unknown",
                },
            ],
        },
        "command.token.selector_without_arguments": {
            name: "meta.command.token.selector_without_arguments.mcfunction",
            match: "(?<= )(\\@[a-z])(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "support.class.mcfunction",
                },
            },
        },
        "command.token.resource_location": {
            name: "meta.command.token.resource_location.mcfunction",
            match: "(?<= )([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "entity.name.function.mcfunction",
                },
                2: {
                    name: "entity.name.function.mcfunction",
                },
                3: {
                    name: "entity.name.function.mcfunction",
                },
            },
        },
        "command.token.tagged_resource_location": {
            name: "meta.command.token.tagged_resource_location.mcfunction",
            match: "(?<= )(\\#)([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "entity.name.function.mcfunction",
                },
                2: {
                    name: "entity.name.function.mcfunction",
                },
                3: {
                    name: "entity.name.function.mcfunction",
                },
                4: {
                    name: "entity.name.function.mcfunction",
                },
            },
        },
        "command.token.range": {
            name: "meta.command.token.range.mcfunction",
            match: "(?<= )(\\-?\\d*\\.?\\d+)?(\\.\\.)(\\-?\\d*\\.?\\d+)?(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
                2: {
                    name: "keyword.control.mcfunction",
                },
                3: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "command.token.number": {
            name: "meta.command.token.number.mcfunction",
            match: "(?<= )(\\-?\\d*\\.?\\d+)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "command.token.coordinate": {
            name: "meta.command.token.coordinate.mcfunction",
            match: "(?<= )([\\~\\^])(\\-?\\d*\\.?\\d+)?(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
                2: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "command.token.boolean": {
            name: "meta.command.token.boolean.mcfunction",
            match: "(?<= )(true|false)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "command.token.operation": {
            name: "meta.command.token.operation.mcfunction",
            match: "(?<= )(\\%\\=|\\*\\=|\\+\\=|\\-\\=|\\/\\=|\\<|\\=|\\>|\\>\\<|\\<\\=|\\>\\=)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "command.token.literal": {
            name: "meta.command.token.literal.mcfunction",
            match: "(?<= )([a-z_][a-z0-9_]*)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "entity.name.mcfunction",
                },
            },
        },
        "command.token.uuid": {
            name: "meta.command.token.uuid.mcfunction",
            match: "(?<= )([0-9a-fA-F]+(?:(-)[0-9a-fA-F]+){4})(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "support.class.mcfunction",
                },
            },
        },
        "command.token.fakeplayer": {
            name: "meta.command.token.fakeplayer.mcfunction",
            match: "(?<= )([\\#\\$\\%]\\S+)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "support.class.mcfunction",
                },
            },
        },
        "command.token.unquoted_string": {
            name: "meta.command.token.unquoted_string.mcfunction",
            match: "(?<= )(\\S+)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "string.unquoted.mcfunction",
                },
            },
        },
        "command.token.unknown": {
            name: "meta.command.token.unknown.mcfunction",
            match: "(?<= )([^ \\n]*)(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "invalid.illegal.mcfunction",
                },
            },
        },
        "command.token.root_redirect": {
            name: "meta.command.token.root_redirect.mcfunction",
            match: "(?<= )(run) ([a-z_][a-z0-9_]*)?(?=[ \\n]|$)",
            captures: {
                1: {
                    name: "entity.name.mcfunction",
                },
                2: {
                    name: "keyword.control.mcfunction",
                },
            },
        },
        "command.token.greedy_parent": {
            name: "meta.command.token.greedy_parent.mcfunction",
            match: "((?<=^say | say ))(.*)$",
            captures: {
                1: {
                    name: "entity.name.mcfunction",
                },
                2: {
                    name: "string.quoted.mcfunction",
                },
            },
        },
        "command.token.nbt_compound": {
            name: "meta.command.token.nbt_compound.mcfunction",
            begin: "(?<= )(\\{)",
            end: "(?=\\n)|(\\})([^ \\n]*)",
            beginCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#nbt.compound",
                },
            ],
        },
        "command.token.nbt_list": {
            name: "meta.command.token.nbt_list.mcfunction",
            begin: "(?<= )(\\[)(\\w*;)?",
            end: "(?=\\n)|(\\])([^ \\n]*)",
            beginCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
                2: {
                    name: "variable.language.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#nbt.list",
                },
            ],
        },
        "nbt.compound": {
            patterns: [
                {
                    match: " +",
                },
                {
                    begin: '(,)? *([A-Za-z0-9_\\.\\-]+|\\"[^\\n\\"]+\\") *(\\:) *',
                    end: " *(?=[\\n\\}\\,])",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "string.interpolated.mcfunction",
                        },
                        3: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.value",
                        },
                    ],
                },
                {
                    match: "[^\\n\\}\\,]+",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        "nbt.list": {
            patterns: [
                {
                    match: " +",
                },
                {
                    begin: "(,)? *(?=[^\\n\\]\\,])",
                    end: " *(?=[\\n\\]\\,])",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.value",
                        },
                    ],
                },
                {
                    match: "[^\\n\\]\\,]+",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        "nbt.value": {
            patterns: [
                {
                    begin: "(\\{)",
                    end: "(?=\\n)|(\\})",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.compound",
                        },
                    ],
                },
                {
                    begin: "(\\[)(\\w*;)?",
                    end: "(?=\\n)|(\\])",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.list",
                        },
                    ],
                },
                {
                    begin: '(\\")',
                    end: '(?=\\n)|(\\")',
                    beginCaptures: {
                        1: {
                            name: "string.quoted.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "string.quoted.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#common.quoted_string",
                        },
                    ],
                },
                {
                    begin: "(\\')",
                    end: "(?=\\n)|(\\')",
                    beginCaptures: {
                        1: {
                            name: "string.quoted.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "string.quoted.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#common.single_quoted_string",
                        },
                    ],
                },
                {
                    match: "(true|false)",
                    name: "constant.numeric.mcfunction",
                },
                {
                    match: "(\\-?\\d*\\.?\\d+)",
                    name: "constant.numeric.mcfunction",
                },
                {
                    match: "([^\\s\\{\\}\\[\\]\\,\\:\\=]+)",
                    name: "string.unquoted.mcfunction",
                },
                {
                    match: "[^\\n\\,\\]\\}]+",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        "command.token.quoted_string": {
            name: "meta.command.token.quoted_string.mcfunction",
            begin: '(?<= )(\\")',
            end: '(?=\\n)|(\\")([^ \\n]*)',
            beginCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#common.quoted_string",
                },
            ],
        },
        "command.token.single_quoted_string": {
            name: "meta.command.token.single_quoted_string.mcfunction",
            begin: "(?<= )(\\')",
            end: "(?=\\n)|(\\')([^ \\n]*)",
            beginCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#common.single_quoted_string",
                },
            ],
        },
        "command.token.block_predicate": {
            name: "meta.command.token.block_predicate.mcfunction",
            begin: "(?<= )(?=(\\#)?([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)(\\[|\\{))",
            end: "(?=\\n)|(?:(?<=\\])(?!\\{)|(?<=\\}))([^ \\n]*)",
            endCaptures: {
                1: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#block_predicate",
                },
            ],
        },
        "command.token.block_predicate_without_namespace": {
            name: "meta.command.token.block_predicate_without_namespace.mcfunction",
            begin: "(?<= )(?=(\\#)?([a-z0-9_\\.\\-\\/]+)(\\[ *([a-z_][a-z0-9_]*) *\\=))",
            end: "(?=\\n)|(?:(?<=\\])(?!\\{)|(?<=\\}))([^ \\n]*)",
            endCaptures: {
                1: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#block_predicate",
                },
            ],
        },
        "command.token.selector_with_arguments": {
            name: "meta.command.token.selector_with_arguments.mcfunction",
            begin: "(?<= )(\\@[a-z])(\\[)",
            end: "(?=\\n)|(\\])([^ \\n]*)",
            beginCaptures: {
                1: {
                    name: "support.class.mcfunction",
                },
                2: {
                    name: "support.class.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "support.class.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    name: "meta.selector.argument_spacing.mcfunction",
                    match: " +",
                },
                {
                    name: "meta.selector.argument.mcfunction",
                    begin: "((?:[a-z_][a-z0-9_]*)|(?:\"[^\"\n]*\")|(?:\\'[^\\'\n]*\\')) *(\\=) *(\\!)? *",
                    end: "( *\\,)(?=[\\]\\n])|( *\\,)|(?= *[\\]\\n])",
                    beginCaptures: {
                        1: {
                            name: "variable.other.mcfunction",
                        },
                        2: {
                            name: "support.class.mcfunction",
                        },
                        3: {
                            name: "keyword.control.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "invalid.illegal.mcfunction",
                        },
                        2: {
                            name: "support.class.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#selector.argument.resource_location",
                        },
                        {
                            include:
                                "#selector.argument.tagged_resource_location",
                        },
                        {
                            include: "#selector.argument.range",
                        },
                        {
                            include: "#selector.argument.number",
                        },
                        {
                            include: "#selector.argument.boolean",
                        },
                        {
                            include: "#selector.argument.property_map",
                        },
                        {
                            include: "#selector.argument.nbt_compound",
                        },
                        {
                            include: "#selector.argument.quoted_string",
                        },
                        {
                            include: "#selector.argument.single_quoted_string",
                        },
                        {
                            include: "#selector.argument.unquoted_string",
                        },
                        {
                            include: "#selector.argument.unknown",
                        },
                    ],
                },
                {
                    name: "invalid.illegal.mcfunction",
                    match: "[^\\]\\n]+",
                },
            ],
        },
        "command.token.nbt_path": {
            name: "meta.command.token.nbt_path.mcfunction",
            begin: "(?<= )(?=\\w+[\\.\\[\\{])",
            end: "(?=[ \\n]|$)",
            patterns: [
                {
                    include: "#nbt_path.property",
                },
            ],
        },
        "nbt_path.property": {
            patterns: [
                {
                    begin: "(\\.)?(\\w+)?(\\[)",
                    end: "(\\])|(?=\\n)",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "string.interpolated.mcfunction",
                        },
                        3: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt_path.index",
                        },
                    ],
                },
                {
                    begin: "(\\.)?(\\w+)(\\{)",
                    end: "(\\})|(?=\\n)",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "string.interpolated.mcfunction",
                        },
                        3: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.compound",
                        },
                    ],
                },
                {
                    begin: '(\\")',
                    end: '(?=\\n)|(\\")([^\\. \\n]*)',
                    beginCaptures: {
                        1: {
                            name: "string.quoted.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "string.quoted.mcfunction",
                        },
                        2: {
                            name: "invalid.illegal.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#common.quoted_string",
                        },
                    ],
                },
                {
                    match: "(\\.)?(\\w+)",
                    captures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "string.interpolated.mcfunction",
                        },
                    },
                },
                {
                    match: "(\\.)(?=\\.)",
                    captures: {
                        1: {
                            name: "invalid.illegal.mcfunction",
                        },
                    },
                },
                {
                    match: "[^\\.\\s]+",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        "nbt_path.index": {
            patterns: [
                {
                    match: "(?<=\\[)(\\-?\\d+)(?=\\])",
                    captures: {
                        1: {
                            name: "constant.numeric.mcfunction",
                        },
                    },
                },
                {
                    begin: "(\\{)",
                    end: "(?=\\n)|(\\})([^\\]\\,\\n]*)",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "invalid.illegal.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.compound",
                        },
                    ],
                },
                {
                    match: "[^\\n\\]]+",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        block_predicate: {
            patterns: [
                {
                    match: "(\\#)([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)",
                    captures: {
                        1: {
                            name: "entity.name.function.mcfunction",
                        },
                        2: {
                            name: "entity.name.function.mcfunction",
                        },
                        3: {
                            name: "entity.name.function.mcfunction",
                        },
                        4: {
                            name: "entity.name.function.mcfunction",
                        },
                    },
                },
                {
                    match: "([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)",
                    captures: {
                        1: {
                            name: "entity.name.function.mcfunction",
                        },
                        2: {
                            name: "entity.name.function.mcfunction",
                        },
                        3: {
                            name: "entity.name.function.mcfunction",
                        },
                    },
                },
                {
                    match: "([a-z0-9_\\.\\-\\/]+)",
                    captures: {
                        1: {
                            name: "entity.name.function.mcfunction",
                        },
                    },
                },
                {
                    begin: "(\\[)",
                    end: "(\\])",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#block_predicate.arguments",
                        },
                    ],
                },
                {
                    begin: "(\\{)",
                    end: "(\\})",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#nbt.compound",
                        },
                    ],
                },
            ],
        },
        "block_predicate.arguments": {
            patterns: [
                {
                    name: "meta.block_predicate.argument_spacing.mcfunction",
                    match: " +",
                },
                {
                    name: "meta.block_predicate.argument.mcfunction",
                    begin: "([a-z_][a-z0-9_]*) *(\\=) *",
                    end: "(\\,)(?=[\\]\\n])|(\\,)|(?=[\\]\\n])",
                    beginCaptures: {
                        1: {
                            name: "variable.other.mcfunction",
                        },
                        2: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "invalid.illegal.mcfunction",
                        },
                        2: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#block_predicate.argument.number",
                        },
                        {
                            include: "#block_predicate.argument.boolean",
                        },
                        {
                            include: "#block_predicate.argument.literal",
                        },
                    ],
                },
            ],
        },
        "block_predicate.argument.number": {
            name: "meta.block_predicate.argument.number.mcfunction",
            match: "(\\-?\\d*\\.?\\d+)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "block_predicate.argument.boolean": {
            name: "meta.block_predicate.argument.boolean.mcfunction",
            match: "(true|false)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "block_predicate.argument.literal": {
            name: "meta.block_predicate.argument.literal.mcfunction",
            match: "([a-z_][a-z0-9_]*)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "entity.name.mcfunction",
                },
            },
        },
        "selector.argument.resource_location": {
            name: "meta.selector.argument.resource_location.mcfunction",
            match: "([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "entity.name.function.mcfunction",
                },
                2: {
                    name: "entity.name.function.mcfunction",
                },
                3: {
                    name: "entity.name.function.mcfunction",
                },
            },
        },
        "selector.argument.tagged_resource_location": {
            name: "meta.selector.argument.tagged_resource_location.mcfunction",
            match: "(\\#)([a-z0-9_\\.\\-]+)(\\:)([a-z0-9_\\.\\-\\/]+)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "entity.name.function.mcfunction",
                },
                2: {
                    name: "entity.name.function.mcfunction",
                },
                3: {
                    name: "entity.name.function.mcfunction",
                },
                4: {
                    name: "entity.name.function.mcfunction",
                },
            },
        },
        "selector.argument.range": {
            name: "meta.selector.argument.range.mcfunction",
            match: "(\\-?\\d*\\.?\\d+)?(\\.\\.)(\\-?\\d*\\.?\\d+)?(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
                2: {
                    name: "keyword.control.mcfunction",
                },
                3: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "selector.argument.number": {
            name: "meta.selector.argument.number.mcfunction",
            match: "(\\-?\\d*\\.?\\d+)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "selector.argument.boolean": {
            name: "meta.selector.argument.boolean.mcfunction",
            match: "(true|false)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "constant.numeric.mcfunction",
                },
            },
        },
        "selector.argument.unquoted_string": {
            name: "meta.selector.argument.unquoted_string.mcfunction",
            match: "([^\\s\\{\\}\\[\\]\\,\\:\\=\\!]+)(?= *[\\,\\]\\n])",
            captures: {
                1: {
                    name: "string.unquoted.mcfunction",
                },
            },
        },
        "selector.argument.unknown": {
            name: "meta.selector.argument.unknown.mcfunction",
            match: "([^\\]\\n\\,]+)",
            captures: {
                1: {
                    name: "invalid.illegal.mcfunction",
                },
            },
        },
        "selector.argument.quoted_string": {
            name: "meta.selector.argument.quoted_string.mcfunction",
            begin: '(\\")',
            end: '(?=\\n)|(\\") *([^\\]\\,\\n]*)',
            beginCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#common.quoted_string",
                },
            ],
        },
        "selector.argument.single_quoted_string": {
            name: "meta.selector.argument.single_quoted_string.mcfunction",
            begin: "(\\')",
            end: "(?=\\n)|(\\') *([^\\]\\,\\n]*)",
            beginCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "string.quoted.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#common.single_quoted_string",
                },
            ],
        },
        "selector.argument.property_map": {
            name: "meta.selector.argument.property_map.mcfunction",
            begin: "(\\{)(?= *([a-z0-9_\\.\\-]+\\:[a-z0-9_\\.\\-\\/]+|[a-z0-9_\\.\\-\\/]+|([A-Za-z0-9_\\.\\-]+)) *(\\=))",
            end: "(?=\\n)|(\\}) *([^\\]\\,\\n]*)",
            beginCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#property_map",
                },
            ],
        },
        "selector.argument.nbt_compound": {
            name: "meta.selector.argument.nbt_compound.mcfunction",
            begin: "(\\{)",
            end: "(?=\\n)|(\\}) *([^\\]\\,\\n]*)",
            beginCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
            },
            endCaptures: {
                1: {
                    name: "variable.language.mcfunction",
                },
                2: {
                    name: "invalid.illegal.mcfunction",
                },
            },
            patterns: [
                {
                    include: "#nbt.compound",
                },
            ],
        },
        property_map: {
            patterns: [
                {
                    match: " +",
                },
                {
                    begin: "(,)? *([A-Za-z0-9_\\.\\-]+) *(\\=) *",
                    end: " *(?=[\\n\\}\\,])",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "entity.name.function.mcfunction",
                        },
                        3: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#property_map.values",
                        },
                    ],
                },
                {
                    begin: "(,)? *([a-z0-9_\\.\\-]+\\:[a-z0-9_\\.\\-\\/]+|[a-z0-9_\\.\\-\\/]+) *(\\=) *",
                    end: " *(?=[\\n\\}\\,])",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "entity.name.function.mcfunction",
                        },
                        3: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#property_map.values",
                        },
                    ],
                },
                {
                    match: "[^\\n\\}\\,]+",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        "property_map.values": {
            patterns: [
                {
                    match: "(true|false)",
                    captures: {
                        1: {
                            name: "constant.numeric.mcfunction",
                        },
                    },
                },
                {
                    match: "(\\-?\\d*\\.?\\d+)?(\\.\\.)(\\-?\\d*\\.?\\d+)?",
                    captures: {
                        1: {
                            name: "constant.numeric.mcfunction",
                        },
                        2: {
                            name: "keyword.control.mcfunction",
                        },
                        3: {
                            name: "constant.numeric.mcfunction",
                        },
                    },
                },
                {
                    match: "(\\-?\\d*\\.?\\d+)",
                    captures: {
                        1: {
                            name: "constant.numeric.mcfunction",
                        },
                    },
                },
                {
                    begin: "(\\{) *",
                    end: "(?=\\n)|(\\}) *([^\\}\\,\\n]*)",
                    beginCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                    },
                    endCaptures: {
                        1: {
                            name: "variable.language.mcfunction",
                        },
                        2: {
                            name: "invalid.illegal.mcfunction",
                        },
                    },
                    patterns: [
                        {
                            include: "#property_map",
                        },
                    ],
                },
            ],
        },
        "common.quoted_string": {
            patterns: [
                {
                    match: '[^\\\\\\"\\n]',
                    name: "string.quoted.mcfunction",
                },
                {
                    match: "\\\\[^\\n]",
                    name: "constant.character.escape.mcfunction",
                },
                {
                    match: "\\\\",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
        "common.single_quoted_string": {
            patterns: [
                {
                    match: "[^\\\\\\'\\n]",
                    name: "string.quoted.mcfunction",
                },
                {
                    match: "\\\\[^\\n]",
                    name: "constant.character.escape.mcfunction",
                },
                {
                    match: "\\\\",
                    name: "invalid.illegal.mcfunction",
                },
            ],
        },
    },
};