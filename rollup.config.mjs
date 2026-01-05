import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import fs from "fs";
import path from "path";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8")
);

const iconFiles = fs
  .readdirSync(path.resolve("src/icons"))
  .filter((f) => f.endsWith(".ts"))
  .map((f) => `src/icons/${f}`);

const inputs = [
  ...iconFiles,
  "src/index.ts",
  "src/createIcon.ts",
  "src/Icon.ts",
  "src/types.ts",
  "src/shared.ts",
  "src/defaultAttributes.ts",
  "src/DynamicIcon.ts",
  "src/dynamic.ts",
];

const config = [
  // ESM and CJS
  {
    input: inputs,
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        entryFileNames: "[name].js",
        preserveModules: true,
        preserveModulesRoot: "src",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        entryFileNames: "[name].js",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "auto",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/__tests__", "**/*.test.ts"],
        compilerOptions: {
          target: "es2019",
          declaration: false,
          noEmit: false,
        },
      }),
    ],
  },
  // UMD
  {
    input: "src/index.ts",
    output: [
      {
        name: "AwsIcons",
        file: "dist/umd/aws-icons.js",
        format: "umd",
        globals: {
          react: "React",
          clsx: "clsx",
        },
        sourcemap: true,
      },
      {
        name: "AwsIcons",
        file: "dist/umd/aws-icons.min.js",
        format: "umd",
        globals: {
          react: "React",
          clsx: "clsx",
        },
        plugins: [terser()],
        sourcemap: true,
      },
    ],
    external: ["react", "clsx"],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          target: "es2019",
          declaration: false,
          noEmit: false,
        },
      }),
    ],
  },
  // Types
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
  {
    input: "src/dynamic.ts",
    output: [{ file: "dist/dynamic.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
