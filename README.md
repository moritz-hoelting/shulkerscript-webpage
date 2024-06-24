# Documentation for ShulkerScript

This is the documentation for ShulkerScript. It is a work in progress and will be updated as the language evolves.

## Getting Started

This documentation is created using Astro and Starlight. To get started, you need to install the dependencies and start the development server.

## Requirements

Required tools:

-   [Node.js](https://nodejs.org)
-   [pnpm](https://pnpm.io)
-   [Cargo](https://rustup.rs)
    -   with `wasm32-unknown-unknown` target installed
-   [`wasm-bindgen-cli`](https://crates.io/crates/wasm-bindgen-cli)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run build-wasm`      | Build your wasm modules                          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
