// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                process: "readonly",
                localStorage: "readonly",
                fetch: "readonly",
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            prettier,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            ...prettierConfig.rules,

            // Regole React
            "react/react-in-jsx-scope": "off", // Non necessario con React 17+
            "react/prop-types": "off", // Disabilito il controllo delle prop-types
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // Regole generali personalizzate
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "max-len": ["error", { code: 120, tabWidth: 4 }],
            indent: ["error", 4, { SwitchCase: 1 }],
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

            // Righe vuote
            "prettier/prettier": ["error", {}, { usePrettierrc: true }],
            "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
            "padded-blocks": ["error", "never"],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "always", prev: "*", next: "function" },
                { blankLine: "always", prev: "function", next: "*" },
            ],

            // Arrow functions
            "prefer-arrow-callback": "error",
            "arrow-spacing": ["error", { before: true, after: true }],
            "arrow-parens": ["error", "as-needed"],
            "func-style": ["error", "expression", { allowArrowFunctions: true }],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
