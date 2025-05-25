use dirs::home_dir;
use serde::Serialize;
use std::fs::{self, DirEntry};
use std::path::PathBuf;

#[dervice(Serialize)]
struct File {
    path: String,
}

#[tauri::command]
pub fn get_base() -> Result<Vec<File>, ()> {
    let mut path = home_dir().expect("Unable to recognize home directory!");
    path.push("Documents");

    match fs::read_dir(&path) {
        Ok(rd) => {
            let mut paths: Vec<File> = Vec::new();
            for entry in rd {
                match entry {
                    Ok(result_path) => {
                        paths.push(File {
                            path: result_path.path().,
                        });
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
