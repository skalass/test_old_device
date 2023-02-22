const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  patterns: [{ from: "./src/index.html", to: "./index.html" }],
};

const pathSrc = path.resolve(__dirname, "src");
const pathPixi = path.resolve(__dirname, "node_modules/pixi.js");

const babelModules = [pathSrc, pathPixi];

module.exports = {
  entry: "./src/testv7.ts",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: babelModules,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /.(png|jp(e*)g)$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Convert images < 1kb to base64 strings
              name: "img/[hash]-[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {},
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  stats: {
    warnings: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(config),
    new webpack.ProvidePlugin({
      PIXI: "pixi.js",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
