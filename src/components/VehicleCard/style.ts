import { StyleSheet } from 'react-native';

import { theme } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.black,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 10,
    flex: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
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
