import { StyleSheet } from 'react-native';

import { theme } from '@theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.gray500,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.2,
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
