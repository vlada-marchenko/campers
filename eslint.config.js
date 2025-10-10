import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  { ignores: ['.next', 'node_modules', 'dist'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
];
