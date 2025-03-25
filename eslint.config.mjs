// eslint.config.js
import next from '@next/eslint-plugin-next'
import js from '@eslint/js'
import ts from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      '@next/next': next
    },
    rules: {
      ...next.configs.recommended.rules,
      // Your custom rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-img-element': 'warn'
    }
  }
]