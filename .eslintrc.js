// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],

  rules: {
    // suppress errors for missing in props validation in files
    'react/prop-types': 0,
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
  },
};
