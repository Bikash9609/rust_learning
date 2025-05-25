use dirs::home_dir;
use std::fs::{self, DirEntry};
use std::path::PathBuf;

struct File {
    path: String,
}

#[tauri::command]
pub fn get_base() -> Result<Vec<DirEntry>, ()> {
    let mut path = home_dir().expect("Unable to recognize home directory!");
    path.push("Documents");

    match fs::read_dir(&path) {
        Ok(rd) => {
            let mut paths: Vec<DirEntry> = Vec::new();
            for entry in rd {
                match entry {
                    Ok(result_path) => {
                        paths.push(result_path);
                    }
                    Err(e) => {
                        eprintln!("{}", e);
                    }
                }
            }
            Ok(paths)
        }
        Err(e) => {
            eprintln!("{}", e);
            Err(())
        }
    }
}
