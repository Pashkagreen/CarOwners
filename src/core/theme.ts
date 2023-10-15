import { Dimensions } from 'react-native';

import { DefaultTheme } from 'react-native-paper';

const { height, width } = Dimensions.get('window');
export const screenHeight: number = height;
export const screenWidth: number = width;

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A5FC9',
    secondary: '#414757',
    error: '#f13a59',
    black: '#000000',
    white: '#fff',
  },
};

export const hitSlop = {
  top: 16,
  left: 16,
  bottom: 16,
  right: 16,
};
