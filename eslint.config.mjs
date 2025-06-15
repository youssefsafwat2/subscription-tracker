import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Apply to all JS files
    files: ["**/*.{js,mjs,cjs}"],

    // Use ESLint's recommended JS rules
    extends: ["plugin:@eslint/js/recommended"],

    // Enable plugins (if you have any custom ones)
    plugins: {
      js,
    },

    // Environment and global variables
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    

    // Optional: custom rules (always do this in real projects)
    rules: {
      // Good example rules for Node.js backends:
      "no-console": "off", // allow console logs in backend
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // warn on unused vars, but ignore unused function args starting with _
      "eqeqeq": ["error", "always"], // force ===
      "curly": ["error", "all"], // require curly braces for all blocks
      quotes: ['error', 'single'],
    },
  },
]);
