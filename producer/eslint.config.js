const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");
const globals = require("globals");

module.exports = defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["dist/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
    },
  },
]);
