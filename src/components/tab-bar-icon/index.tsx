import { FC } from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

interface ITabBarIcon {
  color: string;
  size: number;
  name: string;
}

const TabBarIcon: FC<ITabBarIcon> = ({ color, size, name }) => (
  <View style={styles.container}>
    <Icon color={color} name={name} size={size} />
  </View>
);

export default TabBarIcon;
