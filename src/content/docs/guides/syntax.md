---
title: Syntax
description: Learn the syntax of ShulkerScript
sidebar:
    badge:
        text: WIP
        variant: caution
---

## Comments
Single line comments start with `//` and continue until the end of the line.
Multiline comments start with `/*` and end with `*/`.

```shulkerscript
// This is a single line comment
/* This is a
multiline comment */
```

These comments are completely ignored by the compiler and will not show up in the generated datapack.
If you want to include a comment in the datapack, you can use the doccomment syntax.
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

### Annotations
Annotations are special attributes that can be attached to functions.
They start with `#` followed by the name of the annotation in square brackets. Some annotations can have arguments assigned to them with the `=` operator.

Currently the following annotations are supported:
- `#[tick]`: The function will be executed every tick.
- `#[load]`: The function will be executed when the datapack is loaded.
- `#[deobfuscate]`: The function will keep the original name in the output (path of the `.shu`-file followed by the function name).
- `#[deobfuscate = "path/to/function"]`: The function will be named as specified in the argument.

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