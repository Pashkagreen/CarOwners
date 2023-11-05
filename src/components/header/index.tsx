import { FC, memo } from 'react';

import { Text } from 'react-native-paper';

import styles from './styles';

interface IHeader {
  text: string;
}

const Header: FC<IHeader> = ({ text }) => (
  <Text style={styles.headerText} variant="titleLarge">
    {text}
  </Text>
);

export default memo(Header);
