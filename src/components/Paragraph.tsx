import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';

import {theme} from '../core/theme';

type Props = {
  children: React.ReactNode;
};

const Paragraph = ({children}: Props): JSX.Element => (
  <Text style={styles.text}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    color: theme.colors.secondary,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 14,
    textAlign: 'center',
  },
});

export default memo(Paragraph);
