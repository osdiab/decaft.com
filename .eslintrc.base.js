// any packages referenced here must also be present in the top-level
// package.json, or else extending this config fails
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // Excludes ESLint's rules that conflict with prettier
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["warn", "interface"], // interfaces more performant
  },
};
