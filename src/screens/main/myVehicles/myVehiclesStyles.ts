import {StyleSheet} from 'react-native';

import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatContainer: {
    flex: 1,
    marginTop: 16,
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;
