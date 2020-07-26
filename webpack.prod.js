const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: path.resolve(__dirname, "lib/index.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
      //   {
      //     test: /\.css$/i,
      //     use: ["style-loader", "css-loader"]
      //   },
      //   {
      //     test: /\.html$/i,
      //     loader: "html-loader"
      //   }
    ]
  },
  output: {
    path: path.resolve(__dirname, "formula"),
    filename: "formula.js",
    library: "formula",
    libraryTarget: "var"
  },
  // externals: {},
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules"]
  }
};
