import {StyleSheet} from 'react-native';

import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
