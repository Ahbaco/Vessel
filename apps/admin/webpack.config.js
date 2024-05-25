const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join } = require("node:path");

module.exports = {
  output: {
    path: join(__dirname, "../../dist/apps/admin"),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: "node",
      compiler: "tsc",
      main: "./src/main.ts",
      tsConfig: "./tsconfig.app.json",
      assets: [],
      optimization: false,
      outputHashing: "none",
    }),
  ],
};
