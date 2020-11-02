fetch('./target/wasm32-unknown-unknown/release/wasm_rusty_checkers.wasm').then(response =>
  response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
  const instance = results.instance;
  console.log(instance);
}).catch(console.error);
