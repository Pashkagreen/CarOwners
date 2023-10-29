import { StyleSheet } from 'react-native';

import { theme } from '@theme';

const getStyles = (focused: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderColor: focused ? theme.colors.primary : theme.colors.gray500,
      borderRadius: 4,
      borderWidth: focused ? 2 : 1,
      padding: 12,
    },
    error: {
      color: theme.colors.error,
      fontSize: 14,
      paddingHorizontal: 4,
      paddingTop: 6,
    },
    flagIcon: {
      marginLeft: 4,
    },
    textStyle: {
      fontSize: 16,
    },
    flagWrapper: {
      '@media android': {
        paddingBottom: 4,
      },
      paddingLeft: 8,
    },
    noFlag: {
      height: 0,
      width: 0,
    },
  });

export default getStyles;
