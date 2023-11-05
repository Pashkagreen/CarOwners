import React, { FC, memo } from 'react';
import { Text } from 'react-native';

import styles from './styles';

interface IParagraph {
  children: React.ReactNode;
}

const Paragraph: FC<IParagraph> = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
);

export default memo(Paragraph);
