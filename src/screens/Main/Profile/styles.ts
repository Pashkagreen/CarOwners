import { StyleSheet } from 'react-native';

import { theme } from '@theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    width: '100%',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoBlock: {
    alignItems: 'center',
    width: '100%',
  },
  infoItem: {
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
  },
  buttonBlock: {
    bottom: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  inputBlock: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 16,
    maxHeight: 44,
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});

export default styles;
