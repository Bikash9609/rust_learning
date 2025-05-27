use super::common::exists_path;
use std::fs;
use std::path::Path;

#[tauri::command]
pub fn delete(path: &str) -> Result<bool, String> {
    if !exists_path(path) {
        return Err("Path does not exist or is already deleted".to_string());
    }

    let sub = Path::new(path);
    let action = if sub.is_dir() {
        fs::remove_dir_all(path)
    } else {
        fs::remove_file(path)
    };

    match action {
        Ok(()) => Ok(true),
        Err(e) => {
            eprintln!("{}", e);
            Err(e.to_string())
        }
    }
}
