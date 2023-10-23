module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@lang': './src/lang',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@stacks': './src/stacks',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
