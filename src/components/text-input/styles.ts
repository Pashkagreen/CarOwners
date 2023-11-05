import { StyleSheet } from 'react-native';

import { theme } from '@theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  input: {
    width: '100%',
  },
  error: {
    color: theme.colors.error,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 6,
  },
});

export default styles;
