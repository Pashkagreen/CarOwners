module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@assets': ['./src/assets'],
          '@components': ['./src/components'],
          '@types': ['./src/types.ts'],
          '@constants': ['./src/core/constants'],
          '@permissions': ['./src/core/permissions'],
          '@theme': ['./src/core/theme'],
          '@utils': ['./src/core/utils'],
          '@validators': ['./src/core/validators'],
          '@hooks': ['./src/hooks'],
          '@modals': ['./src/modals'],
          '@services': ['./src/services'],
          '@stores': ['./src/stores'],
          '@navigation': ['./src/navigation'],
          '@screens': ['./src/screens'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
