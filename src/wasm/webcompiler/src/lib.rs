use std::{
    cell::Cell,
    fmt::Display,
    io::{Cursor, Write},
    path::PathBuf,
};

use anyhow::Result;
use base64::prelude::*;
use fs::Directory;
use shulkerscript::{
    base::Handler,
    shulkerbox::virtual_fs::{VFile, VFolder},
};
use wasm_bindgen::prelude::*;
use zip::{write::SimpleFileOptions, ZipWriter};

mod fs;
mod util;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console, js_name = error)]
    fn log_err(s: &str);
}

/// Compiles the given directory into datapack files.
#[wasm_bindgen]
pub fn compile(root_dir: JsValue) -> JsValue {
    let root_dir = VFolder::from(serde_wasm_bindgen::from_value::<Directory>(root_dir).unwrap());

    log("Compiling...");
    if let Ok(folder) = _compile(&root_dir) {
        let folder = Directory::from(folder);
        serde_wasm_bindgen::to_value(&folder).unwrap()
    } else {
        JsValue::null()
    }
}

/// Returns a base64 encoded zip file containing the compiled datapack.
#[wasm_bindgen(js_name = compileZip)]
pub fn compile_zip(root_dir: JsValue) -> String {
    let root_dir = VFolder::from(serde_wasm_bindgen::from_value::<Directory>(root_dir).unwrap());

    let datapack = _compile(&root_dir).unwrap();

    let mut buffer = Cursor::new(Vec::new());
    let mut writer = ZipWriter::new(&mut buffer);
    let virtual_files = datapack.flatten();

    // write each file to the zip archive
    for (path, file) in virtual_files {
        writer
            .start_file(path, SimpleFileOptions::default())
            .unwrap();
        match file {
            VFile::Text(text) => {
                writer.write_all(text.as_bytes()).unwrap();
            }
            VFile::Binary(data) => {
                writer.write_all(data).unwrap();
            }
        }
    }

    writer.set_comment("Data pack created with Shulkerscript web compiler");

    writer.finish().unwrap();

    BASE64_STANDARD.encode(buffer.into_inner())
}

fn _compile(root_dir: &VFolder) -> Result<VFolder> {
    let printer = Printer::new();
    util::compile(&printer, root_dir, &get_script_paths(root_dir))
}

struct Printer {
    printed: Cell<bool>,
}
impl<T: Display> Handler<T> for Printer {
    fn receive<E: Into<T>>(&self, error: E) {
        log_err(&error.into().to_string());
        self.printed.set(true);
    }

    fn has_received(&self) -> bool {
        self.has_printed()
    }
}
impl Printer {
    /// Creates a new [`Printer`].
    fn new() -> Self {
        Self {
            printed: Cell::new(false),
        }
    }

    fn has_printed(&self) -> bool {
        self.printed.get()
    }
}

fn get_script_paths(root: &VFolder) -> Vec<(String, PathBuf)> {
    root.flatten()
        .into_iter()
        .filter_map(|(p, _)| {
            p.strip_suffix(".shu")
                .and_then(|p| p.strip_prefix("src/"))
                .map(|ident| (ident.to_string(), PathBuf::from(&p)))
        })
        .collect()
}
