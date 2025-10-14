---
title: Syntax
description: Learn the syntax of Shulkerscript
---

## Comments
Single-line comments start with `//` and continue until the end of the line.
Multi-line comments start with `/*` and end with `*/`.

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
If you want to use [function arguments](#parameters), take a look at [macro strings](#macro-strings) in combination with the [`run`](#run) keyword, as literal commands are just syntactic sugar.
:::

## Functions
!changed[0.2.0]

Functions are blocks of code that can be executed.
They start with `fn` followed by the name of the function, [arguments](../../reference/functions/#arguments) in parentheses and a block of code.
Optionally they can be preceded by annotations. When a function has the `pub` keyword in front of it, it will be accessible from other files.
```shulkerscript title="src/main.shu"
#[tick]
fn main() {
    /say Hello, world!
}

#[deobfuscate]
pub fn hello(macro name) {
    /say I can be called from other files!
    run `say Hello $(name)`;
}
```
This code defines a function called `main` that will be executed every tick.

:::note
Shulkerscript always requires at least one function annotated with `tick`, `load` or `deobfuscate`. 
Otherwise, no `.mcfunction` files will be generated.
:::

### Function calls
Functions can be called by using their name followed by parenthesis.
Arguments can be specified in the parenthesis separated by commas.
```shulkerscript
#[tick]
fn main() {
    hello("World");
}

fn hello(macro name) {
    run `say Hello, $(name)!`;
}
```

### Return
!since[0.2.0]

To early end a function execution or to return a value, the `return` command was added in Minecraft 1.20.
Similarly, the `return` statement is available in Shulkerscript.

```shulkerscript
#[deobfuscate = "returns_value"]
fn returnsValue() {
    return 5;
}
```

:::caution[Important]
This should be always preferred over using the raw `/return` command.
Special handling is done to make returning work in combination with conditionals, groups, etc.
:::

### Annotations
Annotations are special attributes that can be attached to functions.
They start with `#` followed by the name of the annotation in square brackets. Some annotations can have arguments assigned to them with the `=` operator.
Currently, the following annotations are supported:
- `#[tick]`: The function will be executed every tick.
- `#[load]`: The function will be executed when the data pack is loaded.
- `#[deobfuscate]`: The function will keep the original name in the output (path of the `.shu`-file followed by the function name).
- `#[deobfuscate = "path/to/function"]`: The function will be named as specified in the argument.

### Parameters

Functions can be defined with parameters by specifying them in the parenthesis. When calling the function, the arguments have to be passed in the same order.

```shulkerscript
fn hello(macro greeting, macro name) {
    run `say $(greeting), $(name)!`;
}

#[load]
fn main() {
    hello("Hello", "world");
}
```

Keep in mind that if a function has parameters, they cannot be used with the annotations `#[tick]` or `#[load]`, as arguments cannot be provided in that case.

:::caution[Important]
Due to limitations in the way Minecraft macros work, together with the handling of complex statements like groups and if-else statements, special care has to be taken when using the escapement character `\` in the arguments.

This happens because Minecraft inserts the macro text literally into the slot, thereby losing one level of escaping when it is passed to another function. If you absolutely need to use the `\` character in your arguments, compile the datapack, observe how and where it is passed and adjust the escaping accordingly.
:::


### Provided functions
!since[0.2.0]

Shulkerscript provides some internal functions.
These can be called like user-defined functions, but have access to the compilation process and therefore greater possibilities.

| Function | Description |
| -------- | ----------- |
| `print`  | Allows to print a string or macro string to the chat. Variables in the macro string are substituted at runtime. |

Example:

```shulkerscript
#[load]
fn load() {
    int x = 5;
    print(`Value of x=$(x)`);
}
```

## Template Strings
!since[0.2.0]

To use variables inside of strings, template strings can be used.
Instead of normal quotation marks `"`, the backtick `` ` `` is used for this type of string.
Inside a template string, `$(VAR_NAME)` can be used to place the value of the variable at that position in the string.

When wanting to use it in a regular command, use the run syntax.

```shulkerscript
fn macroFunction(macro name) {
    run `say Hello $(name)`;
}
```

:::tip
You can use template strings in most places inside functions where you would use a string.
This includes execute blocks and conditional statements.
:::

## Imports

Functions and global variables from other files can be imported by using the `from`-`import` syntax.
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
!changed[0.2.0]

In Minecraft, tags are used to group multiple items, blocks, entities, etc. together.
In Shulkerscript, tags can be defined right in the code, where they are needed.
```shulkerscript
tag<"block"> "foo" [
    "minecraft:stone",
    "minecraft:dirt"
]
```

This will result in a tag of type `block` with the name `foo` containing the blocks `minecraft:stone` and `minecraft:dirt`.

If you want the tag to replace, instead of append to the existing tag, you can use the `replace` keyword.
```shulkerscript
tag<"block"> "foo" replace [
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
`<"[type]">` can be omitted and will default to `"function"`.
:::

## Conditional Statements
Conditional statements are used to execute code based on a condition.
They start with `if` followed by a condition in parentheses and a block of code.
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
They consist of the keyword you would pass to the `/execute` command followed the argument as a string in parentheses and a block of code.
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
[Conditionals](#conditional-statements) are also implemented as execute blocks. Therefore, you can chain them together with other execute blocks. Keep in mind that an if-else statement can only be used as the last execute block in a chain.
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

## Variables
!since[0.2.0]

Variables can be used to store values.
There are different types available, and they differ in how they are stored, 
what data can be stored in them and how they can be used.

| Keyword | Storage method  | Usage |
| ------- | --------------- | ----- |
| `int`   | Scoreboard      | Single integer values |
| `bool`  | Data Storage    | Single boolean values |
| `val`   | Compiler memory | Can store any data type, but has to be known at compile time |
| `int[NUMBER]` | Scoreboard | Array of `NUMBER` integers |
| `bool[NUMBER]` | Data Storage | Array of `NUMBER` booleans |
| `int[]` | Scoreboard      | Map of integers       |
| `bool[]` | Entity tag     | Map of booleans (keys have to be valid entities in the world) |

```shulkerscript
int x = 5;
bool y = true;

int z = x + 2;

int[2] arr;
arr[0] = 1;
arr[1] = 2;
```

Read more in the [reference](../../reference/variables).

## Loops
!since[0.2.0]

While loops can be used to execute commands multiple times.
The entire loop takes place within a single game-tick.
For running commands every tick, the `#[tick]` annotation should be used on a function.

```shulkerscript
while ("entity @p") {
    /say @p
}
```

Compile-time conditions will be expanded at compile-time into a list of commands without requiring logic in Minecraft.

```shulkerscript
val x = 0;
while (x < 3) {
    run `say $(x)`;
    x = x + 1;
}
```
This will become
```mcfunction
say 0
say 1
say 2
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

## Member Access
!since[0.2.0]

Additional properties of values can be accessed via member access (or dot notation).
For example, `.length` gets the length of a string.
Additional information about variable member access can be found in the [variable reference](../../reference/variables).
If you need the actual name of the macro used in a function, you can get it with `.name`.