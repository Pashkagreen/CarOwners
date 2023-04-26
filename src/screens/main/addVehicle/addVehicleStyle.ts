import {StyleSheet} from 'react-native';

import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginLeft: -16,
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    marginLeft: 14,
  },
  inputBlock: {
    width: '100%',
  },
  btn: {
    marginTop: 24,
  },
});

export default styles;
