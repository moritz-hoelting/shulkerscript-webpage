---
title: Variables
description: Different types and use-cases of variables
---

Variables are used to store data to be used later. There are different types of variables for numbers and booleans.

In Minecraft, these variables are stored in scoreboards, tags, and NBT storages, depending on the type of data. Shulkerscript provides a way to work with these variables in a more abstract way.

## Integer Variables

Integer variables are used to store whole numbers. They can be created using the `int` keyword.

```shulkerscript
// Create an integer variable called myInt
int myInt = 42;

// Create an array of integers
int manyInts[5] = [1, 2, 3, 4, 5];
// Access the third element of the array (indexing starts at 0)
manyInts[2] = 42;

// Create an entity-integer map/scoreboard
int myScore[];
// Set the score of the nearest player to 42
myScore["@p"] = 42;
```

The scoreboard objective can be accessed with `myInt.objective` and the target/targets with `myInt.target`/`myInts.targets`.

### Operations

You can perform operations on integer variables, such as addition, subtraction, multiplication, and division.

```shulkerscript
int a = 5;
int b = 3;
int c = a + b; // c is now 8
int d = a - b; // d is now 2
int e = a * b; // e is now 15
int f = a / b; // f is now 1, integer division
int g = a % b; // g is now 2, remainder of the division
```

## Boolean Variables

Boolean variables are used to store true or false values. They can be created using the `bool` keyword.

```shulkerscript
// Create a boolean variable called myBool
bool myBool = true;

// Create an array of booleans
bool manyBools[5] = [true, false, true, false, true];

// Create an entity-boolean map/tag and set the value of the nearest player to true at the same time
bool myScore["@p"] = true;
```

The tag or storage name can be accessed with `myBool.name` and the storage path with `myBools.path`.
