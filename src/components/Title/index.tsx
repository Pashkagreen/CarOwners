import React, { memo } from 'react';
import { Text } from 'react-native';

import styles from './style';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

export default memo(Title);
