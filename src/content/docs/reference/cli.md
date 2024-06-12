---
title: Command-line interface reference
description: Reference for the ShulkerScript command-line tool
sidebar:
    label: CLI
---

The ShulkerScript CLI is a command-line tool for managing ShulkerScript projects.


## init
Initalize a project at the specified path.
Creates project files and directories.
```bash
shulkerscript init [OPTIONS] [PATH]
```
- `PATH`: The path to the directory where the project should be created. Defaults to the current directory.

Options:
- `--force`: Allow initalizing in a non-empty directory.
- `--name`: The name of the project. Defaults to the name of the directory.
- `--description`: The description of the project.
- `--pack-format`: The format of the pack. Defaults to `26`.
- `--vcs`: The version control system to use. Defaults to `git`.

## build
Build the project at the specified path to the `dist` folder.
```bash
shulkerscript build [OPTIONS] [PATH]
```
- `PATH`: The path to the directory where the project is located. Defaults to the current directory.

Options:
- `--output <OUTPUT>`  The output directory, overrides the `DATAPACK_DIR` environment variable

Environment variables:
- `DATAPACK_DIR`       The output directory [default: `./dist`]

## package
Build and package the project at the specified path to a `.zip` file.
```bash
shulkerscript package [OPTIONS] [PATH]
```

- `PATH`: The path to the directory where the project is located. Defaults to the current directory.

Options & Environment:
- Same as `build`

## watch
```bash
shulkerscript watch [OPTIONS] [SUBCOMMAND]
```
- `SUBCOMMAND`: The command to run when changes have been detected, has to be either `build` or `package` [default: `build`]

Options:
- `--no-initial`                     Do not run the command initially
- `--debounce-time <DEBOUNCE_TIME>`  The time to wait in ms after the last change before running the command [default: `2000`]

## clean
Clean the output directory of the project at the specified path.
```bash
shulkerscript clean [OPTIONS] [PATH]
```
- `PATH`: The path of the project folder to clean [default: `.`]

Options:
- `--output <OUTPUT>`  The output directory, overrides the `DATAPACK_DIR` environment variable

Environment variables:
- `DATAPACK_DIR`       The output directory [default: `./dist`]