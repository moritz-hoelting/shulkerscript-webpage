import type { LanguageInput } from "shiki";

export const mcscriptGrammar: LanguageInput = {
    name: "mcscript",
    aliases: [],
    displayName: "mcscript",
    fileTypes: ["mcscript"],
    scopeName: "source.mcscript",
    patterns: [
        {
            name: "comment.line.double-slash.mcscript",
            match: "//.*",
        },
        {
            name: "comment.line.hash.mcscript",
            match: "\\s*#.*",
        },
        {
            name: "constant.numeric.mcscript",
            match: "\\b[0-9\\.\\-]+\\b",
        },
        {
            name: "entity.name.command.mcscript",
            match: "\\b(?:advancement|ban|banlist|data|clear|clone|debug|defaultgamemode|deop|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|help|kick|kill|list|locate|me|msg|op|pardon|pardon-ip|particle|playsound|publish|recipe|reload|replaceitem|save-all|save-off|save-on|say|scoreboard|seed|setblock|setidletimeout|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|tell|tellraw|time|title|trigger|weather|whitelist|worldborder|xp)\\b",
        },
        {
            name: "keyword.control.mcscript",
            match: "\\b(?:if|then|else|unless|true|false|as|at|asat|positioned|align|dimension|rotated|anchored|while|do|forEach|for|raycast|stop|continue|switch|case|default|var|bool|boolean|tag|score|const)\\b",
        },
        {
            name: "keyword.operator.mcscript",
            match: "(\\=|\\+\\=|\\-\\=|\\*\\=|\\/\\=|\\%\\=|\\+\\+|\\-\\-|\\*|\\/|\\+|\\-|\\%|\\>|\\<|\\>\\=|\\<\\=)",
        },
        {
            name: "keyword.operator.file.mcscript",
            match: "(\\s*#file:|\\s*#extend:)(\\s+)([\\w\\d$\\/\\._-]*)",
        },
        {
            name: "string.quoted.double.mcscript",
            match: '"(?:[^\\\\]|\\\\.)*?"',
        },
        {
            name: "string.quoted.single.mcscript",
            match: "'(?:[^\\\\]|\\\\.)*?'",
        },
        {
            name: "variable.mcscript",
            match: "(\\$[\\w\\-]*)",
        },
        {
            name: "support.function.entity.mcscript",
            match: "\\b(?:@a|@p|@s|@r|@e)\\b",
        },
        {
            name: "support.type.entity.mcscript",
            match: "\\b(?:area_effect_cloud|armor_stand|arrow|bat|blaze|boat|cave_spider|chest_minecart|chicken|cod_mob|commandblock_minecart|cow|creeper|dolphin|donkey|dragon_fireball|drowned|egg|elder_guardian|ender_crystal|ender_dragon|ender_pearl|enderman|endermite|evocation_fangs|evocation_illager|eye_of_ender_signal|falling_block|fireball|fireworks_rocket|furnace_minecart|ghast|giant|guardian|hopper_minecart|horse|husk|illusion_illager|item|item_frame|leash_knot|lightning_bolt|llama|llama_spit|magma_cube|minecart|mooshroom|mule|ocelot|painting|parrot|phantom|pig|polar_bear|potion|puffer_fish|rabbit|salmon_mob|sheep|shulker|shulker_bullet|silverfish|skeleton|skeleton_horse|slime|small_fireball|snowball|snowman|spawner_minecart|spectral_arrow|spider|squid|stray|tnt|tnt_minecart|trident|tropical_fish|turtle|vex|villager|villager_golem|vindication_illager|witch|wither|wither_skeleton|wither_skull|wolf|xp_bottle|xp_orb|zombie|zombie_horse|zombie_pigman|zombie_villager)\\b",
        },
    ],
    repository: {
        "$base": {},
        "$self": {},
        command: {
            name: "entity.name.command.mcscript",
            match: "\\/\\b(?:command1|command2|...)\\b",
        },
        keyword: {
            name: "keyword.control.mcscript",
            match: "\\b(?:if|else|...)\\b",
        },
        operator: {
            name: "keyword.operator.mcscript",
            match: "(\\+|\\-|\\*|\\/|...)",
        },
        string: {
            patterns: [
                {
                    name: "string.quoted.double.mcscript",
                    match: '"(?:[^\\\\]|\\\\.)*?"',
                },
                {
                    name: "string.quoted.single.mcscript",
                    match: "'(?:[^\\\\]|\\\\.)*?'",
                },
            ],
        },
    },
};
