import { StyleSheet } from 'react-native';

import { screenHeight, screenWidth } from '../../core/theme';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    padding: 0,
    width: '100%',
  },
  container: {
    flex: 1,
    flexGrow: 1,
    height: screenHeight,
    width: screenWidth,
  },
});

export default styles;
