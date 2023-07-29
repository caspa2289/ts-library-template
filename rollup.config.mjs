import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from "@rollup/plugin-terser"

//FIXME: тесты попадают в билд

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "build/cjs/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "build/esm/index.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
        ],
    },
    {
        input: "build/esm/types/src/index.d.ts",
        output: [{ file: "build/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
]
