import rust from "@wasm-tool/rollup-plugin-rust";

export default [
    {
        input: {
            main: "Cargo.toml",
        },
        plugins: [
            rust(),
        ],
    }
];
