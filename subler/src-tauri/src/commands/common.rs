use std::path::Path;

pub fn exists_path(path: &str) -> bool {
    Path::new(path).exists()
}

pub fn is_empty(path: &str) -> bool {
    let sub = Path::new(path);
    if sub.is_dir() {
        let files_count = match sub.read_dir() {
            Ok(v) => v.count(),
            Err(_) => 0,
        };
        return files_count > 0;
    }
    true
}
