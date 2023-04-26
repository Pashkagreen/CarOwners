import { StyleSheet } from 'react-native';

import { theme } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    color: theme.colors.error,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default styles;
