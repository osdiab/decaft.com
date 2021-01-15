/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require("../../.eslintrc.base.js");
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "../../.eslintrc.base.js",
    "plugin:react/recommended",
    "prettier/react",
  ],
  parserOptions: {
    ...baseConfig.parserOptions,
    ecmaFeatures: { jsx: true },
  },
  plugins: [...baseConfig.plugins, "react", "@emotion"],
  rules: {
    "react/react-in-jsx-scope": "off", // not necessary anymore
    "react/prop-types": "off", // typescript handles types already
    "@emotion/pkg-renaming": "error",
  },
  settings: { react: { version: "detect" } },
};
