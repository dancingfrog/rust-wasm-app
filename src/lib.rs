extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = alert)]
    fn js_alert(s: &str);

    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn js_log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn js_log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn js_log_many(a: &str, b: &str);
}

#[wasm_bindgen(js_name = greet)]
pub fn js_greet (name: &str) {
    js_log(&format!("Hello, {}!", name));
    js_alert(&format!("Hello, {}!", name));
}

pub fn greet(name: &str) {
    println!("Hello, {}!", name);
}
