import { StyleSheet } from 'react-native';

import { screenHeight, screenWidth } from '../../core/theme';

const getStyles = () =>
  StyleSheet.create({
    modal: { flex: 1, margin: 0, padding: 0, width: '100%' },
    container: {
      flex: 1,
      height: screenHeight,
      width: screenWidth,
    },
    imageContainer: {
      alignItems: 'center',
      flex: 1,
      flexGrow: 1,
      maxHeight: screenHeight * 0.6,
      top: screenHeight * 0.2,
      width: '100%',
    },
    image: {
      height: '100%',
      marginHorizontal: 16,
      width: screenWidth - 32,
    },
  });

export default getStyles;
