# WASM Rust

A simple Web Assembly module written in Rust. 

After installing rust and cargo via [rustup](https://www.rust-lang.org/tools/install), add the wasm target and then compile the module:

    rustup target add wasm32-unknown-unknown
    cargo build --target wasm32-unknown-unknown

Optionally, the module can also be built via npm and webpack.
