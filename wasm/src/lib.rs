use std::{cell::Cell, fmt::Display, path::Path};

use shulkerscript_lang::{
    base::{file_provider::FileProvider, source_file::SourceFile, Error, Handler, Result},
    lexical::token_stream::TokenStream,
    shulkerbox::{util::compile::CompileOptions, virtual_fs::VFolder},
    syntax::parser::Parser,
    transpile::transpiler::Transpiler,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn compile(source_text: &str) -> JsValue {
    let datapack = internal_compile(source_text).ok().map(|folder| {
        folder
            .flatten()
            .into_iter()
            .map(|(path, file)| (path, file.clone()))
            .collect::<Vec<_>>()
    });

    serde_wasm_bindgen::to_value(&datapack).unwrap()
}

struct DummyFileProvider {
    content: String,
}
impl DummyFileProvider {
    pub fn new(content: String) -> Self {
        Self { content }
    }
}
impl FileProvider for DummyFileProvider {
    fn load(&self, _path: &Path) -> Option<String> {
        Some(self.content.clone())
    }
}

struct Printer {
    printed: Cell<bool>,
}
impl<E: Display> Handler<E> for Printer {
    fn receive(&self, error: E) {
        log(&error.to_string());
        self.printed.set(true);
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

fn internal_compile(source_text: &str) -> Result<VFolder> {
    let file_provider = DummyFileProvider::new(source_text.to_string());

    let source_file = SourceFile::load(&file_provider, Path::new("input.shu"))?;

    let printer = Printer::new();

    let tokens = TokenStream::tokenize(&source_file, &printer);

    if printer.has_printed() {
        return Err(Error::Other(
            "An error occurred while tokenizing the source code.",
        ));
    }

    let mut parser = Parser::new(&tokens);
    let program = parser.parse_program(&printer).ok_or(Error::Other(
        "An error occured while parsing the source code.",
    ))?;

    if printer.has_printed() {
        return Err(Error::Other(
            "An error occurred while parsing the source code.",
        ));
    }

    let mut transpiler = Transpiler::new("shulkerscript-pack", 27);
    transpiler.transpile(&program, &printer)?;
    let datapack = transpiler.into_datapack();

    Ok(datapack.compile(&CompileOptions::default()))
}
