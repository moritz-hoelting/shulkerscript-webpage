use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};
use shulkerscript::shulkerbox::virtual_fs::{VFile, VFolder};

#[allow(dead_code)]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct File {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) language: Option<String>,
    pub(crate) content: String,
}
impl File {
    pub fn with_lang(self, lang: String) -> Self {
        Self {
            language: Some(lang),
            ..self
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Directory {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) dirs: Option<BTreeMap<String, Directory>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub(crate) files: Option<BTreeMap<String, File>>,
}

impl From<Directory> for VFolder {
    fn from(value: Directory) -> Self {
        let mut folder = VFolder::new();

        if let Some(dirs) = value.dirs {
            for (name, dir) in dirs {
                folder.add_existing_folder(&name, dir.into())
            }
        }

        if let Some(files) = value.files {
            for (name, file) in files {
                folder.add_file(&name, file.into());
            }
        }

        folder
    }
}
impl From<File> for VFile {
    fn from(value: File) -> Self {
        VFile::Text(value.content)
    }
}

impl From<VFolder> for Directory {
    fn from(value: VFolder) -> Self {
        let mut dirs = BTreeMap::new();
        let mut files = BTreeMap::new();

        for (name, item) in value.get_folders() {
            dirs.insert(name.to_string(), item.clone().into());
        }

        for (name, item) in value.get_files() {
            files.insert(name.to_string(), item.clone().into());
        }

        Self {
            dirs: Some(dirs),
            files: Some(files),
        }
    }
}

impl From<VFile> for File {
    fn from(value: VFile) -> Self {
        let content = match value {
            VFile::Text(content) => content,
            VFile::Binary(bin) => String::from_utf8_lossy(&bin).to_string(),
        };
        Self {
            content,
            language: None,
        }
    }
}
