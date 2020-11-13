fetch('./target/wasm32-unknown-unknown/release/wasm_rusty_checkers.wasm')
    .then(response => response.arrayBuffer())
    .then(instantiateWebAssembly)
    .then(callWebAssemblyFunction)
    .catch(e => {
        console.error('Fallback to debug wasm module because:\n' + e);
        fetch('./target/wasm32-unknown-unknown/release/wasm_rusty_checkers.wasm')
            .then(response => response.arrayBuffer())
            .then(instantiateWebAssembly)
            .then(callWebAssemblyFunction)
            .catch(console.error);
    });

function instantiateWebAssembly (bytes) {
    return WebAssembly.instantiate(bytes);
}

function callWebAssemblyFunction (results) {
    const instance = results.instance;
    console.log(instance);
}
