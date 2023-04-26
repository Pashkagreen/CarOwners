import { StyleSheet } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    left: 14,
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
  },
});

export default styles;
