import { Platform, StyleSheet } from 'react-native';

import { theme } from '@theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const getStyles = (headerHeight: number) =>
  StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      elevation: 1000,
      height: headerHeight,
      justifyContent: 'center',
      left: 0,
      paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0, // default IOS insets
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1000,
    },
    text: {
      color: theme.colors.secondary,
      fontWeight: 'bold',
    },
  });

export default getStyles;
