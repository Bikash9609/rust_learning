use dirs::home_dir;
use serde::Serialize;
use std::fs::{self};
use std::path::PathBuf;
use std::result;

#[derive(Serialize)]
pub struct File {
    name: String,
    path: String,
    is_dir: bool,
    is_file: bool,
}

#[derive(Serialize)]
pub struct GetBaseResponse {
    files: Vec<File>,
    root_dir: PathBuf,
}

#[tauri::command]
pub fn get_base() -> Result<GetBaseResponse, ()> {
    let mut path = home_dir().expect("Unable to recognize home directory!");
    path.push("Documents");

    match fs::read_dir(&path) {
        Ok(rd) => {
            let mut paths: Vec<File> = Vec::new();
            for entry in rd {
                match entry {
                    Ok(result_path) => {
                        paths.push(File {
                            path: result_path.path().as_path().display().to_string(),
                            is_dir: result_path.file_type().unwrap().is_dir(),
                            is_file: result_path.file_type().unwrap().is_file(),
                            name: result_path.file_name().into_string().unwrap(),
                        });
                    }
                    Err(e) => {
                        eprintln!("{}", e);
                    }
                }
            }
            Ok(GetBaseResponse {
                files: paths,
                root_dir: path,
            })
        }
        Err(e) => {
            eprintln!("{}", e);
            Err(())
        }
    }
}
