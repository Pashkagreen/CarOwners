import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';

import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {hitSlop, theme} from '../core/theme';

const VehicleCard = ({item, onPress, onDeletePress}: any): JSX.Element => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.brand}>
      <View style={styles.infoBlock}>
        <Text>Model: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleMedium">
          {item.brand}
        </Text>
      </View>
      <View style={styles.model}>
        <Text style={{color: theme.colors.primary}} variant="titleMedium">
          {item.model}
        </Text>
      </View>
    </View>
    <View style={styles.infoBlock}>
      <View>
        <Text>Year: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleMedium">
          {item.year}
        </Text>
      </View>
      <View>
        <Text>Mileage: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleMedium">
          {item.mileage}
        </Text>
      </View>
    </View>
    <View style={styles.infoBlock}>
      <View>
        <Text>Price: </Text>
        <Text style={{color: theme.colors.primary}} variant="titleMedium">
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

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.black,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 10,
    flex: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.secondary,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 12,
    width: '100%',
  },
  model: {marginLeft: 4},
  brand: {flexDirection: 'row'},
  infoBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
