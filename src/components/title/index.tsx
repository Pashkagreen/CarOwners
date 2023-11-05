import React, { FC, memo } from 'react';
import { Text } from 'react-native';

import styles from './styles';

interface ITitle {
  children: React.ReactNode;
}

const Title: FC<ITitle> = ({ children }) => (
  <Text style={styles.header}>{children}</Text>
);

export default memo(Title);
