import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node, // agora sim: process, __dirname, Buffer etc.
      },
    },
    rules: {
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var", "export"],
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var", "export"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        { blankLine: "any", prev: "export", next: "export" },
      ],
    },
  },
);
