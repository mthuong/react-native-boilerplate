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
    // Disable rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // 'import/prefer-default-export': 0,
    // 'import/no-cycle': 0,
    // 'class-methods-use-this': 0,
    // '@typescript-eslint/interface-name-prefix': 0,
    // 'import/order': 0,
    // 'no-console': 0,
    // 'prefer-destructuring': 0,
    // 'react/destructuring-assignment': 0,
    // 'react/jsx-filename-extension': 0,
    // 'no-useless-catch': 0,
    // 'import/no-extraneous-dependencies': 0,
    // '@typescript-eslint/explicit-function-return-type': 0,
    // 'no-plusplus': 0,
    // 'no-case-declarations': 0,
    // 'consistent-return': 0,
    // '@typescript-eslint/no-use-before-define': 0,
    // 'no-underscore-dangle': 0,
    // 'no-restricted-syntax': 0,
    // 'no-param-reassign': 0,
    // '@typescript-eslint/camelcase': 0,
    // 'react/jsx-fragments': 0,
    // 'react/jsx-props-no-spreading': 0,
    // 'react/require-default-props': 0,
    // 'no-unused-expressions': 0,
    // 'max-classes-per-file': 0,
    // eqeqeq: 'off',
    // 'react/sort-comp': 0,
    // 'react/no-array-index-key': 0,

    // Enable rules
    'no-inline-styles/no-inline-styles': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': false,
        'ts-ignore': false,
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
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
