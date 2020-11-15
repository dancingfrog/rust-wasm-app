import rust from "@wasm-tool/rollup-plugin-rust";
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default [
    {
        input: {
            main: "Cargo.toml",
        },
        plugins: [
            rust(),

            commonjs(),

            copy({
                targets: [
                    // { src: 'src/data', dest: 'public/' },
                    // { src: 'src/images', dest: 'public/' },
                    // { src: 'src/styles/imports', dest: 'public/' },
                    { src: 'static/**', dest: 'public/' },
                    { src: 'target/wasm32-unknown-unknown/release/*', dest: 'public/' }
                ]
            }),
        ],
    }
];
