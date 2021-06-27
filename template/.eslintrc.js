module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-no-inline-styles',
    'jest',
    'react-hooks',
    'simple-import-sort',
  ],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    __DEV__: true,
    device: false,
    expect: false,
    waitFor: false,
    element: false,
    by: false,
  },
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'import/order': 0,
    'no-console': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'no-useless-catch': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-plusplus': 0,
    'no-case-declarations': 0,
    'consistent-return': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/camelcase': 0,
    'react/jsx-fragments': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/no-empty-interface': 'off',
    'no-unused-expressions': 0,
    'no-inline-styles/no-inline-styles': 'error',
    'max-classes-per-file': 0,
    eqeqeq: 'off',
    'react/sort-comp': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        allowExistingDirectories: true,
      },
    },
  },
}
