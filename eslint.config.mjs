import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Disable the React Hooks exhaustive deps warning
      "react-hooks/exhaustive-deps": "off",

      // Disable unused variable warnings temporarily
      "@typescript-eslint/no-unused-vars": "warn",

      // Add this to suppress missing types/modules if needed
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default eslintConfig;
