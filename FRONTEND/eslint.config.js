import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginA11y from 'eslint-plugin-jsx-a11y';

import pluginImport from 'eslint-plugin-import';
import pluginJest from 'eslint-plugin-jest';
import pluginTestingLibrary from 'eslint-plugin-testing-library';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist', 'node_modules', '**/*.d.ts', 'src/shared/api/data/*.json'],
  },

  ...tseslint.configs.recommended,

  // Configuração para React, Hooks, A11y
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginHooks,
      'jsx-a11y': pluginA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: __dirname,
      },
      globals: { ...globals.browser },
    },
    settings: {
      react: {
        version: 'detect',
        jsxRuntime: 'automatic',
      },
    },
    rules: {
      ...pluginReactConfig.rules,
      ...pluginHooks.configs.recommended.rules,
      ...pluginA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
      'react/destructuring-assignment': ['error', 'always'],
    },
  },

  // Configuração para Ordem de Importação
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { import: pluginImport },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@/app/**', group: 'internal' },
            { pattern: '@/pages/**', group: 'internal' },
            { pattern: '@/widgets/**', group: 'internal' },
            { pattern: '@/features/**', group: 'internal' },
            { pattern: '@/entities/**', group: 'internal' },
            { pattern: '@/shared/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Configuração para Testes
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/__tests__/**/*.{ts,tsx}'],
    plugins: {
      jest: pluginJest,
      'testing-library': pluginTestingLibrary,
    },
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      ...pluginTestingLibrary.configs.react.rules,
    },
  },

  // Configuração para arquivos de Config da raiz
  {
    files: ['*.config.{js,ts}', '.*.js'],
    languageOptions: { globals: { ...globals.node } },
  },

  // Desativa regras do ESLint que conflitam com o Prettier
  eslintConfigPrettier,
];
