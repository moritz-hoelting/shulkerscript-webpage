---
title: Command-line interface reference
description: Reference for the Shulkerscript command-line tool
---

The Shulkerscript CLI is a command-line tool for managing Shulkerscript projects.


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
- `--icon`: The path to the icon file. Leave empty for default icon.
- `--batch`: Do not prompt for input, use default values instead if possible or fail.
- `--vcs`: The version control system to use. Defaults to `git`.

## build
Build the project at the specified path to the `dist` folder.
```bash
shulkerscript build [OPTIONS] [PATH]
```
- `PATH`: The path to the directory where the project is located. Defaults to the current directory.

Options:
- `--assets <ASSETS>`  The path to the assets directory [default: `./assets`]
- `--output <OUTPUT>`  The output directory, overrides the `DATAPACK_DIR` environment variable
- `--no-validate`      Skip validation of the pack format
- `--zip`              Package the output into a zip file

Environment variables:
- `DATAPACK_DIR`       The output directory [default: `./dist`]

## watch
```bash
shulkerscript watch [OPTIONS] [PATH]
```
- `PATH`: The path of the project folder to watch [default: `.`]

Options:
- `--no-initial`                     Do not run the command initially
- `--debounce-time <DEBOUNCE_TIME>`  The time to wait in ms after the last change before running the command [default: `2000`]
- `--execute <COMMAND>`              The shulkerscript commands to execute in the project when changes have been detected [multi-arg, default: `build .`]
- `--no-execute`                     Do not execute any predefined shulkerscript commands
- `--shell`                          The shell commands to execute in the project when changes have been detected [multi-arg]

## clean
Clean the output directory of the project at the specified path.
```bash
shulkerscript clean [OPTIONS] [PATH]
```
- `PATH`: The path of the project folder to clean [default: `.`]

Options:
- `--output <OUTPUT>`  The output directory, overrides the `DATAPACK_DIR` environment variable
- `--all`              Clean all files in the output directory, not only the ones generated by shulkerscript
- `--force`            Required for `--all` to prevent accidental deletion of files

Environment variables:
- `DATAPACK_DIR`       The output directory [default: `./dist`]