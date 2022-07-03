import typescript from "@rollup/plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
  input: "index.ts",
  output: {
    file: "dist/index.js",
  },
  plugins: [
    typescript(),
    nodeResolve({
      main: true,
      browser: true,
    }),
  ],
};
