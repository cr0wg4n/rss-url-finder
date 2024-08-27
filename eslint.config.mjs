import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
  {
    rules: {
      'sort-imports': 'error',
      'curly': 'error',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/max-len': ['error', {
        code: 80,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreComments: true
      }],
      '@stylistic/object-curly-newline': ['error', {
        ImportDeclaration: 'always',
        ExportDeclaration: 'always'
      }],
    },
  },
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
)
