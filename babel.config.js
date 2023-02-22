module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  overrides: [
    {
      test: ["./node_modules"],
      sourceType: "unambiguous",
    },
  ],
};
