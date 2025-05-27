mod commands;

use commands::delete::delete;
use commands::modify::rename;
use commands::read::{get_base, get_folder_files};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_base,
            get_folder_files,
            rename,
            delete
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
