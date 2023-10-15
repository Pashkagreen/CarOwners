import React, { memo } from 'react';
import { Text } from 'react-native';

import styles from './style';

interface Props {
  children: React.ReactNode;
}

const Paragraph = ({ children }: Props): JSX.Element => (
  <Text style={styles.text}>{children}</Text>
);

export default memo(Paragraph);
