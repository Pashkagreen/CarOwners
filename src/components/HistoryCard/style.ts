import { StyleSheet } from 'react-native';

import { theme } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.secondary,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
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
