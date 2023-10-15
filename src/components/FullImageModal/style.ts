import { StyleSheet } from 'react-native';

import { EdgeInsets } from 'react-native-safe-area-context';

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.8)',
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      height: '80%',
      width: '100%',
      zIndex: 2,
    },
    crossButton: {
      position: 'absolute',
      right: 16,
      top: insets.top + 10,
    },
    imageLoading: {
      position: 'absolute',
      zIndex: 0,
    },
  });

export default getStyles;
