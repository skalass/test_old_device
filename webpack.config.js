const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  patterns: [{ from: "./src/index.html", to: "./index.html" }],
};

const pathSrc = path.resolve(__dirname, "src");
const pathPixi = path.resolve(__dirname, "node_modules/pixi.js");
console.log(pathPixi);

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
            overrides: [
              {
                test: ["./node_modules"],
                sourceType: "unambiguous",
              },
            ],
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
    warnings: true,
    assets: true,
    modules: false,
    colors: true,
    errors: true,
    errorDetails: true,
    performance: true,
    timings: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(config),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
