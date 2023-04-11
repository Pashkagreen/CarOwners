import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TabBarIconInterface {
  color: string;
  size: number;
  name: string;
}

const TabBarIcon = ({color, size, name}: TabBarIconInterface): JSX.Element => (
  <Icon color={color} name={name} size={size} />
);

export default TabBarIcon;
