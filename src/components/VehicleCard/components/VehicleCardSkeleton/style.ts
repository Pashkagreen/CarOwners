import { StyleSheet } from 'react-native';

import { theme } from '../../../../core/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    height: 180,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default styles;
