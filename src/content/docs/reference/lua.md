---
title: Lua Integration
description: Reference for writing Lua code in Shulkerscript
sidebar:
    badge:
        text: WIP
        variant: caution
---

Shulkerscript supports writing Lua code directly in your scripts. This allows you to use Lua's powerful features and libraries to extend the functionality of your scripts.

The Lua code is embedded in the Shulkerscript code using the `lua` keyword. You can pass variables from Shulkerscript to Lua, and the Lua code can return values that can be used in Shulkerscript.
```shulkerscript
int a = 5;
int b = lua(a) {
    -- Lua code goes here
    print("The objective is: " .. a.objective);
    print("The target is: " .. a.target);
    return 10;
};
```

:::caution
The Lua code is run during **compilation**, not during **execution** of the Shulkerscript. This means that the Lua code can only access the variables that are available at compile time, e.g. therefore receiving the objective and target of an `int` variable, but not the actual value that is only available during execution.
:::

Your Lua code should return a string value when used in combination with the run keyword. This string returned will be included in the output.

## Syntax

```shulkerscript
run lua() {
    -- Lua code goes here
    return "Hello, Lua!";
};
```

## Inputs

The variables from Shulkerscript can be passed to lua by putting the variable name in the parentheses of the `lua` keyword. The variable will be available in the Lua code as a global variable with the same name.

Depending on the type of the variable, the Lua code will receive a different type of value. The following table shows the mapping of Shulkerscript types to Lua types:

| Shulkerscript Type       | Lua Type                                    |
| ------------------------ | ------------------------------------------- |
| int                      | table { objective: string, target: string } |
| bool                     | table { storage: string, path: string }     |
| macro function parameter | string "$(macro)$                           |

```shulkerscript
fn greet(name) {
    run `say Greeting $(name) from Lua:`;
    run lua(name) {
        return {
            value="Hello, " .. name .. "!",
            contains_macro=true
        }
    };
}
```

:::note
When returning a value that contains a macro, instead of just returning the value, you have to return a table with the value and a boolean that indicates that the value contains a macro.
:::

## Shulkerscript Module

The Lua environment has access to a few globals that are provided by Shulkerscript. These globals are available in the `shulkerscript` table. The following values are available in the `shulkerscript` table:

-   `version`: The version of Shulkerscript that is being used in string format.
-   `file_path`: The path to the file where the Lua code is written.
-   `start_line`: The line number where the Lua code starts.
-   `end_line`: The line number where the Lua code ends.
-   `start_column`: The column number where the Lua code starts.
-   `end_column`: The column number where the Lua code ends.

After variables are introduced in Shulkerscript, it is planned to make them available in the Lua environment as well.

:::tip[Feedback Requested]
If you can think of any other globals that should be available in the Lua environment, please let us know! This could include:

-   variables with values (like `version`)
-   functions that calculate/modify values (general utility things not provided by Lua or specific to Shulkerscript)

Please either write a mail or open an issue on GitHub. The links can be found in the upper right corner of the page.
:::
