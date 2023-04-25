module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['jest', 'prettier', '@typescript-eslint', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/jsx-uses-react': 1,
    'arrow-body-style': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-console': 'off',
    // 'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'no-duplicate-imports': 'off',
    'react-native/no-unused-styles': 0,
    'react-native/sort-styles': [
      'warn',
      'asc',
      {ignoreClassNames: true, ignoreStyleProperties: false},
    ],
    'react/react-in-jsx-scope': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'no-restricted-imports': [
      'warn',
      {
        paths: ['react-native-gesture-handler'],
      },
    ],
    'react-hooks/exhaustive-deps': 'off', // useEffect error disable
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react`
          ['^(react|react-native|react-redux)$'],

          // libs
          ['^[^.]*$'],

          //reducers/services
          ['reducer|service'],

          //views and components
          ['view$'],
          ['components'],

          //configs/utils
          ['config|utils'],

          // styles .
          ['localization$|styles'],
        ],
      },
    ],
  },
};
