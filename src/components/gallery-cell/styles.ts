import { StyleSheet } from 'react-native';

import { theme } from '@theme';

const styles = StyleSheet.create({
  photo: {
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
  },
  removeIcon: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.outline,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 18,
    width: '100%',
  },
  addToText: {
    color: theme.colors.secondary,
    fontSize: 16,
    lineHeight: 14,
    paddingTop: 8,
  },
  plusToAddIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
