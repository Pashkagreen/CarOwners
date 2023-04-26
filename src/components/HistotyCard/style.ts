import { StyleSheet } from 'react-native';

import { theme } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.secondary,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  text: { marginBottom: 8 },
});

export default styles;
