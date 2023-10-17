import { StyleSheet } from 'react-native';

import { theme } from '../../../core/theme';

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
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonBlock: {
    bottom: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  inputBlock: {
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});

export default styles;
