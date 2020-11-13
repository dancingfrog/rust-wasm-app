fetch('./target/wasm32-unknown-unknown/release/wasm_rust.wasm')
    .then(response => response.arrayBuffer())
    .then(instantiateWebAssembly)
    .then(callWebAssemblyFunction)
    .catch(e => {
        console.error('Fallback to debug wasm module because:\n' + e);
        fetch('./target/wasm32-unknown-unknown/debug/wasm_rust.wasm')
            .then(response => response.arrayBuffer())
            .then(instantiateWebAssembly)
            .then(callWebAssemblyFunction)
            .catch(console.error);
    });

function instantiateWebAssembly (bytes) {
    return WebAssembly.instantiate(bytes);
}

function callWebAssemblyFunction (results) {
    instance = results.instance;
    document.getElementById("container").textContent = instance.exports.add_one(41);
}
