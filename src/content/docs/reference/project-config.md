---
title: Pack config reference
description: Reference for the pack.toml
---

The project is configured in the `pack.toml` file at the root of the project. It is automatically created when you create a new project with `shulkerscript init`.

```toml
[pack]
# The name of the datapack
name = "shulkerpack"
# The description of the datapack
description = "I created this datapack with Shulkerscript"
# The pack format of the datapack (https://minecraft.wiki/w/Data_pack#Pack_format)
pack_format = 26
# The version of the datapack (currently not used)
version = "0.1.0"

[compiler] # optional
# path to the folder to use as a datapack template
# this folders files and subfolders will be copied to the root of the datapack
# optional
assets = "./assets"
```