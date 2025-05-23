use std::fs::{self, OpenOptions};
use std::io::Write;

pub fn read_file(path: &str) -> Result<String, ()> {
    create_file(path, Some(false));

    match fs::read_to_string(path) {
        Ok(content) => Ok(content),
        Err(_) => {
            print!("Error reading file at path {}", path);
            Err(())
        }
    }
}

pub fn check_file_exists(path: &str) -> bool {
    fs::exists(path).unwrap_or(false)
}

pub fn create_file(path: &str, truncate: Option<bool>) {
    let mut opt = OpenOptions::new();

    if check_file_exists(path) {
        println!("Truncating existing file {}", path);
        opt.truncate(truncate.unwrap_or(false)).write(true)
    } else {
        println!("Creating new file {}", path);
        opt.create(true)
    };

    opt.write(true).open(path).expect("Error handling file");
}

pub fn write_file(path: &str, content: &str) -> Result<Option<()>, ()> {
    match fs::write(path, content) {
        Ok(_) => Ok(None),
        Err(e) => {
            eprintln!("Error thrown {}", e);
            Err(())
        }
    }
}

pub fn add_to_file(path: &str, content: &str) {
    let mut file = match OpenOptions::new().append(true).create(true).open(path) {
        Ok(f) => f,
        Err(e) => {
            eprintln!("Error opening file to write path {} err {}", path, e);
            return;
        }
    };

    file.write_all(content.as_bytes()).expect("Failed to write")
}
