import { StyleSheet } from 'react-native';

import { theme } from '../../../core/theme';

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
