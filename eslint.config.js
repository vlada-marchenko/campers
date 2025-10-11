
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next.configs.recommended, 
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },
]
