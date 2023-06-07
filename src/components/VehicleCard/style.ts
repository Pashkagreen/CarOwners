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
  modelBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    width: '100%',
  },
  model: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  modelBrand: {
    color: theme.colors.primary,
    marginRight: 4,
  },
  infoBlock: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photosContainer: {
    flex: 1,
    gap: 2,
    height: 80,
    marginBottom: 12,
    width: '100%',
  },
  photosBlock: { flexDirection: 'row', flexGrow: 1, gap: 2 },
});

export default styles;
