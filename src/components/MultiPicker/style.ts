import { StyleSheet } from 'react-native';

import { screenWidth } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    marginTop: 12,
    width: '100%',
  },
  wrapper: {
    flexDirection: 'column',
    marginTop: 16,
    width: '100%',
  },
  image: {
    borderRadius: 4,
    height: 100,
    width: (screenWidth - 40) / 3 - 10,
  },
  includeImage: {
    borderRadius: 4,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
});

export default styles;
