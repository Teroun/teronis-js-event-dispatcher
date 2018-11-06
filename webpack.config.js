const path = require('path');
const DtsBundlePlugin = require("dts-bundle-webpack");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const PackageFile = require("./package.json");

module.exports = {
  mode: "development",
  entry: PackageFile.module,
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: ["babel-loader", "awesome-typescript-loader"]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  output: {
    filename: path.basename(PackageFile.main),
    path: path.resolve(__dirname, path.dirname(PackageFile.main)),
    library: ["Teronis", "EventDispatcher"],
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), "node_modules"],
    extensions: ["js", ".ts", ".tsx"],
    plugins: [new TsConfigPathsPlugin()]
  },
  plugins: [new DtsBundlePlugin({
    name: PackageFile.name,
    main: PackageFile.source,
    // prevents deleting <baseDir>/**/*.d.ts outside of <baseDir>
    baseDir: path.dirname(PackageFile.source),
    // absolute path to prevent the join of <baseDir> and <out>
    out: path.resolve(__dirname, PackageFile.types),
    removeSource: true,
    outputAsModuleFolder: true
  })]
};