const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true
  },
  devtool: "sourceMap",
  entry: path.resolve(__dirname, "src/index.ts"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].bundle.js",
    library: "formula",
    libraryTarget: "var"
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules"]
  }
};
