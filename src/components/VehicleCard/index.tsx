import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { hitSlop, theme } from '../../core/theme';
import styles from './style';

const VehicleCard = ({ item, onPress, onDeletePress }: any): JSX.Element => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.brand}>
      <View style={styles.infoBlock}>
        <Text>Model: </Text>
        <Text style={{ color: theme.colors.primary }} variant="titleMedium">
          {item.brand}
        </Text>
      </View>
      <View style={styles.model}>
        <Text style={{ color: theme.colors.primary }} variant="titleMedium">
          {item.model}
        </Text>
      </View>
    </View>
    <View style={styles.infoBlock}>
      <View>
        <Text>Year: </Text>
        <Text style={{ color: theme.colors.primary }} variant="titleMedium">
          {item.year}
        </Text>
      </View>
      <View>
        <Text>Mileage: </Text>
        <Text style={{ color: theme.colors.primary }} variant="titleMedium">
          {item.mileage}
        </Text>
      </View>
    </View>
    <View style={styles.infoBlock}>
      <View>
        <Text>Price: </Text>
        <Text style={{ color: theme.colors.primary }} variant="titleMedium">
          {item.price}
        </Text>
      </View>
      <View>
        <TouchableOpacity hitSlop={hitSlop} onPress={onDeletePress}>
          <Icon name="trash-can-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default VehicleCard;
