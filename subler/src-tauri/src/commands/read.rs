use dirs::home_dir;
use serde::Serialize;
use std::env::consts;
use std::fs;
use std::path::PathBuf;

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

    if consts::OS != "macos" {
        path.push("Documents");
    }

    match fs::read_dir(&path) {
        Ok(rd) => {
            let mut paths: Vec<File> = Vec::new();
            for entry in rd {
                match entry {
                    Ok(result_path) => {
                        let name = result_path.file_name().into_string().unwrap();

                        if name.starts_with('.') {
                            continue;
                        };

                        paths.push(File {
                            path: result_path.path().as_path().display().to_string(),
                            is_dir: result_path.file_type().unwrap().is_dir(),
                            is_file: result_path.file_type().unwrap().is_file(),
                            name,
                        });
                    }
                    Err(e) => {
                        eprintln!("{}", e);
                    }
                }
            }

            paths.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));
            paths.sort_by(|a, b| b.is_dir.cmp(&a.is_dir));

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

#[tauri::command]
pub fn get_folder_files(path: &str) -> Result<Vec<File>, ()> {
    let mut readables = Vec::<File>::new();
    let entries = fs::read_dir(&path).map_err(|e| {
        eprintln!("Failed to read directory:{}", e);
    })?;

    for file in entries {
        let entry = match file {
            Ok(content) => content,
            Err(e) => {
                eprintln!("{}", e);
                continue;
            }
        };

        let name = entry.file_name().into_string().unwrap();
        if name.starts_with('.') {
            continue;
        };

        let entry_path = entry.path();
        readables.push(File {
            is_dir: entry_path.is_dir(),
            is_file: entry_path.is_file(),
            name,
            path: entry_path.display().to_string(),
        });
    }

    Ok(readables)
}
