import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var", "export", "type", "interface"],
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var", "export", "type", "interface"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        { blankLine: "any", prev: "export", next: "export" },
        {
          blankLine: "any",
          prev: ["type", "interface"],
          next: ["type", "interface"],
        },
      ],
    },
  },
);
