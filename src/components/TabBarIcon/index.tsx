import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';

interface TabBarIconInterface {
  color: string;
  size: number;
  name: string;
}

const TabBarIcon = ({
  color,
  size,
  name,
}: TabBarIconInterface): JSX.Element => (
  <View style={styles.container}>
    <Icon color={color} name={name} size={size} />
  </View>
);

export default TabBarIcon;
