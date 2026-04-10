import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  /* globalIgnores(['dist/**', 'build/**', 'node_modules/**']), */
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    /* extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ], */
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      '@stylistic/arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/quote-props': ['error', 'as-needed', { unnecessary: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', {
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
      }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-one-expression-per-line': ['error', 'always'],
      '@stylistic/jsx-tag-spacing': ['error', { closingSlash: 'never' }],
      '@stylistic/jsx-wrap-multilines': 'error',
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-curly-spacing': [2, 'always'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'always'],
      '@stylistic/jsx-max-props-per-line': 'error',
      '@stylistic/jsx-closing-bracket-location': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/keyword-spacing': ['error', { before: true }],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/no-mixed-operators': 'error',
    },
  },
])
