import { memo } from 'react';

import { Text } from 'react-native-paper';

import styles from './style';

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => (
  <Text style={styles.headerText} variant="titleLarge">
    {text}
  </Text>
);

export default memo(Header);
