use base64::engine::general_purpose;
use base64::Engine;
use image::{imageops::FilterType, ColorType, DynamicImage, RgbaImage};
use std::io::{Cursor, Write};
use wasm_bindgen::prelude::*;

// Struct to hold image variants
#[wasm_bindgen]
#[derive(Clone)]
pub struct WasmImageVariants {
    small: String,  // Data URL for small image
    medium: String, // Data URL for medium image
    large: String,  // Data URL for large image
}

#[wasm_bindgen]
impl WasmImageVariants {
    #[wasm_bindgen(getter)]
    pub fn small(&self) -> String {
        self.small.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn medium(&self) -> String {
        self.medium.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn large(&self) -> String {
        self.large.clone()
    }
}

// Main function to generate image variants
#[wasm_bindgen]
pub fn generate_image_variants_wasm(
    input_bytes: Vec<u8>, // Image bytes
    min_width: u32,
) -> Result<WasmImageVariants, JsValue> {
    // Decode the image
    let img = image::load_from_memory(&input_bytes)
        .map_err(|e| JsValue::from_str(&format!("Failed to open image from bytes: {}", e)))?;

    let sizes = vec![
        (480, "small", 50_000),   // Small: Max 50 KB
        (768, "medium", 75_000),  // Medium: Max 75 KB
        (1080, "large", 100_000), // Large: Max 100 KB
    ];

    let mut variants = WasmImageVariants {
        small: String::new(),
        medium: String::new(),
        large: String::new(),
    };

    for (width, label, max_size_bytes) in sizes {
        let resized_width = width.max(min_width);
        let aspect_ratio = img.width() as f32 / img.height() as f32;
        let resized_height = (resized_width as f32 / aspect_ratio) as u32;
        let resized_img = img.resize(resized_width, resized_height, FilterType::CatmullRom);

        // Compress the image
        let compressed_img = compress_image(&resized_img, max_size_bytes)?;

        // Encode image to base64
        let base64_str = general_purpose::STANDARD.encode(&compressed_img);
        let data_url = format!("data:image/webp;base64,{}", base64_str);

        match label {
            "small" => variants.small = data_url,
            "medium" => variants.medium = data_url,
            "large" => variants.large = data_url,
            _ => (),
        }
    }

    Ok(variants)
}

// Compress the image to fit within the max size limit
fn compress_image(img: &DynamicImage, max_size_bytes: usize) -> Result<Vec<u8>, JsValue> {
    let mut quality = 90.0; // Start with high quality
    let mut img_bytes: Vec<u8> = Vec::new();

    loop {
        img_bytes.clear();
        let rgba_img = img.to_rgba8();
        let width = img.width();
        let height = img.height();

        let mut buffer = Cursor::new(Vec::new());

        // Use the lossless WebP encoder
        let encoder = image::codecs::webp::WebPEncoder::new_lossless(&mut buffer);

        // Encode the image with the current quality setting
        match encoder.encode(&rgba_img, width, height, ColorType::Rgba8) {
            Ok(_) => {
                let encoded_bytes = buffer.into_inner();
                if encoded_bytes.len() <= max_size_bytes {
                    return Ok(encoded_bytes);
                }
            }
            Err(e) => {
                return Err(JsValue::from_str(&format!(
                    "Failed to compress image: {}",
                    e
                )));
            }
        }

        // Reduce the quality and try again
        quality -= 10.0;
        if quality < 10.0 {
            // Return the original image if unable to compress below the limit
            return Ok(img.to_rgba8().to_vec());
        }
    }
}
