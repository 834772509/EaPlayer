const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const chalk = require("chalk");

module.exports = {
  mode: "production",
  target: "web",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "eaplayer.js",
    library: "EaPlayer", // 全局挂载包的引用名
    libraryTarget: "umd", //通用模式：支持用户通过es、common.js、AMD的方式引入npm包
    // globalObject: "this", // node 等环境运行时需要设置为 this
  },
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve("./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-withimg-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jp?g|png|bmp|gif|svg)$/,
        type: "asset/inline",
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/inline",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Babel预设
            presets: ["@babel/preset-env"],
            // Babel插件
            plugins: [],
          },
        },
      },
    ],
  },
  // optimization: {
  //   minimizer: [
  //     new CssMinimizerPlugin({
  //       parallel: true,
  //     }),
  //   ],
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(":percent")} (:elapsed seconds)`,
    }),
    // new MiniCssExtractPlugin({ filename: "index.css" }),
  ],
};
