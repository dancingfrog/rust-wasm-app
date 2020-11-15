import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import rust from "@wasm-tool/rollup-plugin-rust";

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
                    { src: 'target/wasm32-unknown-unknown/release/*.wasm', dest: 'public/' }
                ]
            }),
        ],
    },
    {
        input: 'src/game-service.js',
        output: {
            sourcemap: true,
            name: 'self',
            format: 'umd',
            extend: true,
            exports: 'named',
            file: 'public/game-service.js'
        },
        plugins: [
            commonjs(),

            resolve({
                browser: true
            })
        ],
        watch: {
            clearScreen: false
        }
    }
];
