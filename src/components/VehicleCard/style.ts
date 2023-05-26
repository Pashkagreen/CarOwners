import { StyleSheet } from 'react-native';

import { theme } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    width: '100%',
  },
  model: { marginLeft: 4 },
  brand: { flexDirection: 'row' },
  infoBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default styles;
