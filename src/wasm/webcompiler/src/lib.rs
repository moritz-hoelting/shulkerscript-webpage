use std::{
    fmt::Display,
    io::{Cursor, Write},
    path::PathBuf,
    sync::Mutex,
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

    #[wasm_bindgen(js_namespace = ["window", "playground"], js_name = showError)]
    fn show_err(s: &str);
}

/// Compiles the given directory into datapack files.
#[wasm_bindgen]
pub fn compile(root_dir: JsValue) -> JsValue {
    console_error_panic_hook::set_once();

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
pub fn compile_zip(root_dir: JsValue) -> Option<String> {
    console_error_panic_hook::set_once();

    let root_dir = VFolder::from(serde_wasm_bindgen::from_value::<Directory>(root_dir).unwrap());

    let datapack = _compile(&root_dir).ok()?;

    let mut buffer = Cursor::new(Vec::new());
    let mut writer = ZipWriter::new(&mut buffer);
    let virtual_files = datapack.flatten();

    // write each file to the zip archive
    for (path, file) in virtual_files {
        writer.start_file(path, SimpleFileOptions::default()).ok()?;
        match file {
            VFile::Text(text) => {
                writer.write_all(text.as_bytes()).ok()?;
            }
            VFile::Binary(data) => {
                writer.write_all(data).ok()?;
            }
        }
    }

    writer.set_comment("Data pack created with Shulkerscript web compiler");

    writer.finish().ok()?;

    Some(BASE64_STANDARD.encode(buffer.into_inner()))
}

fn _compile(root_dir: &VFolder) -> Result<VFolder> {
    colored::control::set_override(true);
    let printer = Printer::new();
    let res = util::compile(&printer, root_dir, &get_script_paths(root_dir));
    printer.display();
    res
}

struct Printer {
    queue: Mutex<Vec<String>>,
}
impl<T: Display> Handler<T> for Printer {
    fn receive<E: Into<T>>(&self, error: E) {
        self.queue.lock().unwrap().push(format!("{}", error.into()));
    }

    fn has_received(&self) -> bool {
        self.has_printed()
    }
}
impl Printer {
    /// Creates a new [`Printer`].
    fn new() -> Self {
        Self {
            queue: Mutex::new(Vec::new()),
        }
    }

    fn display(self) {
        let queue = self
            .queue
            .into_inner()
            .unwrap()
            .into_iter()
            .map(|el| ansi_to_html::convert(&el).unwrap())
            .collect::<Vec<_>>();
        show_err(&queue.join("\n\n"));
    }

    fn has_printed(&self) -> bool {
        !self.queue.lock().unwrap().is_empty()
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
