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
    -- Lua code goes here
    return "Hello, Lua!";
};
```

## Globals
The following globals are available in the Lua environment:
- `shu_location`: The relative filepath of the script being executed

After variables are introduced in ShulkerScript, it is planned to make them available in the Lua environment as well.

:::note
If you can think of any other globals that should be available in the Lua environment, please let us know! This could include:
- variables with values (like `shu_location`)
- functions that calculate/modify values (general utility things not provided by Lua or specific to ShulkerScript)
- functions that interact with the ShulkerScript environment (flags to set for the compiler to alter the build process)

Please either write a mail or open an issue on GitHub. The links can be found in the upper right corner of the page.
:::