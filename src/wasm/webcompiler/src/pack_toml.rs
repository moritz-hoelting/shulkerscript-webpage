use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct PackToml {
    pub pack: Pack,
}

#[allow(dead_code)]
#[derive(Debug, Clone, Deserialize)]
pub struct Pack {
    pub name: String,
    pub description: Option<String>,
    pub version: Option<String>,
    pub format: u8,
}
