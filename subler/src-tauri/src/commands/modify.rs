use super::common::exists_path;
use std::fs;

#[tauri::command]
pub fn rename(o_path: &str, n_path: &str) -> Result<bool, String> {
    if exists_path(&n_path) {
        return Err("Name already taken!".to_string());
    }

    fs::rename(&o_path, &n_path)
        .map(|_| true)
        .map_err(|e| e.to_string())
}
