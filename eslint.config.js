import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import esImport from 'eslint-plugin-import';

// Mimic CommonJS variables (not needed if using CommonJS).
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Backwards compatibility: translates eslintrc format into flat config format.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Provide base and additional configurations.
  js.configs.recommended,
  eslintConfigPrettier,
  // Mimic eslintrc-style 'extends' for not yet compatible configs with the new flat config format.
  ...compat.extends('eslint-config-airbnb-base'),
  // Define config objects (flat cascading order).
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
  // Config object to globally exclude listed files from linting.
  {
    ignores: [
      'dist',
      'public',
      'node_modules',
      'eslint.config.js',
      'postcss.config.js',
      'vite.config.js',
    ],
  },
  {
    files: ['*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {},
  },
  {
    files: ['./src/**/*.js', './src/**/*.jsx'],
    plugins: {
      import: esImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...esImport.configs.recommended.rules,
      '@import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true },
      ],
    },
  },
];
