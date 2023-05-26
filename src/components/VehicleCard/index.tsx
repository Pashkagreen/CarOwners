import { View } from 'react-native';
import { Animated, TouchableOpacity } from 'react-native';

import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { hitSlop, theme } from '../../core/theme';
import styles from './style';

const VehicleCard = ({
  item,
  index,
  onPress,
  onDeletePress,
  onLayout,
  cardHeight,
  scrollY,
}: any): JSX.Element => {
  const inputRange = [-1, 0, cardHeight * index, cardHeight * (index + 4)];
  const opacityInputRange = [
    -1,
    0,
    cardHeight * index,
    cardHeight * (index + 4),
  ];
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0.4],
  });
  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  });
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <TouchableOpacity
        style={styles.container}
        onLayout={onLayout}
        onPress={onPress}>
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
    </Animated.View>
  );
};

export default VehicleCard;
