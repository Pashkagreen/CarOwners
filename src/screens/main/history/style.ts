import { StyleSheet } from 'react-native';

import { theme } from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  flatContainer: {
    flex: 1,
    marginTop: 16,
    width: '100%',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoBlock: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});

export default styles;
