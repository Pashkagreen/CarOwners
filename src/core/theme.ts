import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    error: '#f13a59',
    black: '#000000',
  },
};

export const hitSlop = {
  top: 16,
  left: 16,
  bottom: 16,
  right: 16,
};
