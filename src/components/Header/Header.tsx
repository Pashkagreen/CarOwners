import React, { memo } from 'react';
import { Text } from 'react-native';

import styles from './style';

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

export default memo(Header);
