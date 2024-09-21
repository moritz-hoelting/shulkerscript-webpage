---
title: If/Else Statements
description: Reference for Conditionals
---

If/Else statements are used to execute code based on a condition. If the condition is true, the code inside the `if` block is executed. If the condition is false, the code inside the `else` block is executed.

```shulkerscript
if ("block ~ ~-1 ~ minecraft:grass_block") {
    /say The block below is grass!
} else {
    /say The block below is not grass!
}
```

The else block is optional. If it is not present, the code inside the if block will be executed if the condition is true, and nothing will be executed if the condition is false.

```shulkerscript
if ("block ~ ~-1 ~ minecraft:grass_block") {
    /say The block below is grass!
}
```

:::note
Conditional statements are implemented to work atomically. This means that only the if or the else block will be executed, not both and only once, regardless of more than one condition being true. If either one is chosen, all commands in this block are run, even when a command before changes the state so the condition would be false. More about this can be found [here](/differences#interfering-with-conditions).
:::

## Logical Operators

Logical operators can be used to combine multiple conditions. The following logical operators are supported:
- `&&` (and): Returns true if both conditions are true.
- `||` (or): Returns true if at least one condition is true.
- `!` (not): Returns true if the condition is false.

```shulkerscript
if ("block ~ ~-1 ~ minecraft:grass_block" && "block ~ ~-2 ~ minecraft:dirt") {
    /say The block below is grass and the block below that is dirt!
}
if ("block ~ ~-1 ~ minecraft:grass_block" || "block ~ ~-1 ~ minecraft:dirt") {
    /say The block below is grass or the block below is dirt!
}
if (!"block ~ ~-1 ~ minecraft:grass_block") {
    /say The block below is not grass!
}
```

By default, the `!` operator has the highest precedence, followed by `&&`, and then `||`. Parentheses can be used to change the order of operations.

```shulkerscript
if (!("block ~ ~-1 ~ minecraft:grass_block" && "block ~ ~-2 ~ minecraft:dirt")) {
    /say This is not true: the block below is grass and the block below that is dirt!
}
```