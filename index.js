const rust = import('./target/wasm32-unknown-unknown/debug/edu');

rust
    .then(m => m.greet('Webpack'))
    .catch(console.error);
