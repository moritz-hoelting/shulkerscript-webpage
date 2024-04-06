---
title: Lua Integration
description: Reference for writing Lua code in ShulkerScript
sidebar:
    badge:
        text: WIP
        variant: caution
---

ShulkerScript supports writing Lua code directly in your scripts. This allows you to use Lua's powerful features and libraries to extend the functionality of your scripts.

The Lua code is embedded in the ShulkerScript code using the `lua` keyword. In the future, you will be able to pass arguments to the Lua code, but for now, you can only write Lua code without arguments.

Your Lua code should return a string value when used in combination with the run keyword. This string returned will be included in the output.

## Syntax
```shulkerscript
run lua() {
    // Lua code goes here
    return "Hello, Lua!";
}
```