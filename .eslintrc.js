module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    comment: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2017,
    extraFileExtensions: ['.json'],
    sourceType: 'module',
    tsconfigRootDir: './',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    camelcase: [
      'error',
      { allow: ['UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillMount'] },
    ],
    'consistent-return': 0,
    'consistent-this': [1, 'that'],
    'default-case': [2],
    'dot-notation': [2],
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }],
    eqeqeq: [2, 'allow-null'],
    'guard-for-in': 2,
    'import/no-unresolved': ['error'],
    'import/no-duplicates': ['error'],
    'max-nested-callbacks': [1, 4],
    'no-alert': 2,
    'no-caller': 2,
    'no-console': 2,
    'no-constant-condition': 2,
    'no-debugger': 2,
    'no-else-return': ['error'],
    'no-global-strict': 0,
    'no-irregular-whitespace': ['error'],
    'no-prototype-builtins': 0, // Disable with exlint v6 update.
    'no-restricted-imports': ['error',
      {
        name: '@patternfly/react-icons',
        message: 'Don\'t use group imports. Use @patternfly/react-icons/dist/js/icons/(kebab-case-name) instead.'
      },
      {
        name: 'lodash',
        message: 'Don\'t use group imports. Use lodash/(funcName) instead.'
      }
    ],
    'no-shadow': ['error'],
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: 'React', args: 'after-used' },
    ],
    '@typescript-eslint/no-use-before-define': 2,
    'no-var': 2,
    'object-shorthand': ['error', 'properties'],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-template': 2,
    radix: 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-string-refs': 1,
    'react/no-unknown-property': 'error',
    'react/prop-types': 0,
    'react/self-closing-comp': ['error', { component: true, html: false }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'require-atomic-updates': 0,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  globals: {
    process: 'readonly',
    global: 'readonly',
  },
};
