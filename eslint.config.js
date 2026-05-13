// https://docs.expo.dev/guides/using-eslint/
import tseslint from "typescript-eslint";
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: ["dist/*", "/.expo", "node_modules"],
  },
]);
