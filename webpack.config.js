const path = require('path');
const DtsBundlePlugin = require("dts-bundle-webpack");

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  output: {
    filename: 'teronis-js-event-dispatcher.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd"
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), "node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [new DtsBundlePlugin({
    name: "@teronis-js/event-dispatcher",
    baseDir: ".",
    main: "src/index.d.ts",
    out: "dist/teronis-js-event-dispatcher.d.ts"
  })]
};