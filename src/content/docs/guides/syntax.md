---
title: Syntax
description: Learn the syntax of Shulkerscript
---

## Comments
Single-line comments start with `//` and continue until the end of the line.
Multiline comments start with `/*` and end with `*/`.

```shulkerscript
// This is a single line comment
/* This is a
multiline comment */
```

These comments are completely ignored by the compiler and will not show up in the generated data pack.
If you want to include a comment in the data pack, you can use the doccomment syntax.
```shulkerscript
/// This is a doccomment
```

## Literal Commands
Literal commands are commands that are directly included in the output.
They start with a `/` and are followed by the command.
```shulkerscript
/say Hello, world!
```

This will result in `say Hello, world!` being included in the `.mcfunction` file.

:::note
Literal commands are just syntactic sugar for the [`run`](#run) keyword.
:::

## Functions
Functions are blocks of code that can be executed.
They start with `fn` followed by the name of the function, parenthesis and a block of code.
Optionally they can be preceeded by annotations. When a function has the `pub` keyword in front of it, it will be accessible from other files.
```shulkerscript title="src/main.shu"
#[tick]
fn main() {
    /say Hello, world!
}

#[deobfuscate]
pub fn hello() {
    /say I can be called from other files!
}
```
This code defines a function called `main` that will be executed every tick.

:::note
Shulkerscript always requires at least one function annotated with `tick`, `load` or `deobfuscate`. 
Otherwise no `.mcfunction` files will be generated.
:::

### Annotations
Annotations are special attributes that can be attached to functions.
They start with `#` followed by the name of the annotation in square brackets. Some annotations can have arguments assigned to them with the `=` operator.
Currently, the following annotations are supported:
- `#[tick]`: The function will be executed every tick.
- `#[load]`: The function will be executed when the data pack is loaded.
- `#[deobfuscate]`: The function will keep the original name in the output (path of the `.shu`-file followed by the function name).
- `#[deobfuscate = "path/to/function"]`: The function will be named as specified in the argument.

### Function calls
Functions can be called by using their name followed by parenthesis.
```shulkerscript
#[tick]
fn main() {
    hello();
}

fn hello() {
    /say Hello, world!
}
```

## Imports

Functions from other files can be imported by using the `from`-`import` syntax.
```shulkerscript title="src/main.shu"
namespace "foo";

from "./foo" import bar;

#[load]
fn main() {
    bar();
}
```

```shulkerscript title="src/foo.shu"
namespace "foo";

pub fn bar() {
    /say Hello, world!
}
```

:::caution[Important]
Notice the `pub` keyword in front of the function `bar`. This is required to make the function accessible from other files.
:::

Multiple functions can be imported by separating them with a comma.
```shulkerscript
from "./foo" import bar, baz;
```

## Tags
In Minecraft, tags are used to group multiple items, blocks, entities, etc. together.
In Shulkerscript, tags can be defined right in the code, where they are needed.
```shulkerscript
tag "foo" of "block" [
    "minecraft:stone",
    "minecraft:dirt"
]
```

This will result in a tag of type `block` with the name `foo` containing the blocks `minecraft:stone` and `minecraft:dirt`.

If you want the tag to replace, instead of append to the existing tag, you can use the `replace` keyword.
```shulkerscript
tag "foo" of "block" replace [
    "minecraft:stone",
    "minecraft:dirt"
]
```

The type has to be the name of the subfolder in the `tags` folder of the data pack. Most often you will use tags with
the types:
- `function`
- `block`
- `item`
- `entity_type`
- `fluid`
- `game_event`

But you can also use custom types, refer to [this page](https://minecraft.wiki/w/Tag) for more information.

:::tip
`of "[type]"` can be omitted and will default to `"function"`.
:::

## Conditional Statements
Conditional statements are used to execute code based on a condition.
They start with `if` followed by a condition in parenthesis and a block of code.
Optionally they can be followed by an `else` block.
```shulkerscript
if ("block ~ ~-1 ~ minecraft:stone") {
    /say On stone
} else {
    /say Not on stone
}
```

To learn more about how to combine or negate conditions, refer to the [if-else statement reference](/reference/conditionals).

## Execute Blocks
Execute blocks are used to execute a block of code in a specific context.
They consist of the keyword you would pass to the `/execute` command followed the argument as a string in parenthesis and a block of code.
```shulkerscript
as ("@a") { // execute as all players
    /say Hello, world!
}
```

:::tip[Quality of Life]
You can use the `asat` keyword to combine the `as` and `at` keywords. It has the same effect as using `as("...")` and `at("@s")` in sequence.
:::

Multiple execute blocks can be chained together by separating them with a comma.
```shulkerscript
positioned ("0 0 0"), in ("minecraft:overworld") {
    /setblock ~ ~ ~ minecraft:stone
}
```

:::tip[Did you know?]
[Conditionals](#conditional-statements) are also implemented as execute blocks.Therefore you can chain them together with other execute blocks. Keep in mind that an if-else statement can only be used as the last execute block in a chain.
:::

### Supported Execute Blocks

- `align`
- `anchored`
- `as`
- `at`
- `asat`
- `facing`
- [`if`](#conditional-statements)
- `in`
- `on`
- `positioned`
- `rotated`
- `store`
- `summon`

:::note
When using the summon execute block with multiple commands in it, only one entity will be summoned and all commands will be executed on that entity. If you want to summon multiple entities, you have to use multiple summon execute blocks.
:::

For general information on the execute command, refer to the [Minecraft Wiki](https://minecraft.wiki/w/Commands/execute).

## Groupings
Groupings are used to group multiple commands into one `mcfunction` file without declaring a new function.
This can be used for commands that need to be executed atomically.
```shulkerscript
group {
    /say Hello
    /say World
}
```

## Run
The `run` keyword is used to evaluate the following expression and include the resulting command in the output.
```shulkerscript
run "say Hello, world!";
```

:::tip
In most cases, you can use [literal commands](#literal-commands) instead of the `run` keyword.
:::

## Lua Code
The `lua` keyword is used to embed Lua code in your Shulkerscript code. It can be combined with the `run` keyword to include the result of the Lua code in the output.
```shulkerscript
run lua() {
    -- Lua code goes here
    return "Hello, Lua!";
};
```