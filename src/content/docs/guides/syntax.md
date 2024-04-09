---
title: Syntax
description: Learn the syntax of ShulkerScript
sidebar:
    badge:
        text: WIP
        variant: caution
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
Optionally they can be preceeded by annotations.
```shulkerscript title="src/main.shu"
#[tick]
fn main() {
    /say Hello, world!
}
```
This code defines a function called `main` that will be executed every tick.

:::note
ShulkerScript always requires at least one function annotated with `tick`, `load` or `deobfuscate`. 
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
- `in`
- `on`
- `positioned`
- `rotated`
- `store`
- `summon`

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
run "say Hello, world!"
```

:::tip
In most cases, you can use [literal commands](#literal-commands) instead of the `run` keyword.
:::

## Lua Code
The `lua` keyword is used to embed Lua code in your ShulkerScript code. It can be combined with the `run` keyword to include the result of the Lua code in the output.
```shulkerscript
run lua() {
    -- Lua code goes here
    return "Hello, Lua!";
};
```