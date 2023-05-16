const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const middleware = require("webpack-dev-middleware");
const path = require("path");

module.exports = {
    // plugins: [
    //     new CopyPlugin({
    //         patterns: [
    //             {
    //                 from: path.resolve(__dirname, 'src/APIKEY.json'),
    //                 to: path.resolve(__dirname, 'build/')
    //             },
    //         ],
    //     }),
    // ],
    webpack: {
    configure: {
      target: "electron-renderer",
      externals: [
        nodeExternals({
          allowlist: [/webpack(\/.*)?/, "electron-devtools-installer"],
        }),
      ],
    },
  },
};
