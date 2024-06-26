import React, { FC, memo } from 'react';
import { LayoutChangeEvent, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { IUploadedPhoto } from '@screens/main/add-vehicle';
import { IVehicle } from '@stores/vehicles/interfaces';
import { hitSlop, theme } from '@theme';
import { Text } from 'react-native-paper';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScrollablePhotoItem from './components/scrollable-photo-item';

import styles from './styles';

interface IVehicleCard {
  item: IVehicle;
  index: number;
  onPress: () => void;
  onDeletePress: () => void;
  onPhotoPress: (photos: IUploadedPhoto[], index: number) => () => void;
  onLayout: (e: LayoutChangeEvent) => void;
  cardHeight: number;
  scrollY: SharedValue<number>;
}

const VehicleCard: FC<IVehicleCard> = ({
  item,
  index,
  onPress,
  onDeletePress,
  onPhotoPress,
  onLayout,
  cardHeight,
  scrollY,
}) => {
  const inputRange = [-1, 0, cardHeight * index, cardHeight * (index + 4)];
  const opacityInputRange = [
    -1,
    0,
    cardHeight * index,
    cardHeight * (index + 4),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const animatedScale = interpolate(
      scrollY.value,
      inputRange,
      [1, 1, 1, 0.4],
    );

    const animatedOpacity = interpolate(
      scrollY.value,
      opacityInputRange,
      [1, 1, 1, 0],
    );

    return {
      transform: [{ scale: animatedScale }],
      opacity: animatedOpacity,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.container}
        onLayout={onLayout}
        onPress={onPress}>
        <View style={styles.modelBlock}>
          <View>
            <Text>Model: </Text>
          </View>
          <View style={styles.model}>
            <Text style={styles.modelBrand} variant="titleMedium">
              {item.brand}
            </Text>
            <Text style={{ color: theme.colors.primary }} variant="titleMedium">
              {item.model}
            </Text>
          </View>
        </View>
        {!!item?.photos?.length && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photosContainer}>
            <View
              style={styles.photosBlock}
              onStartShouldSetResponder={() => true}>
              {item.photos.map((photo: IUploadedPhoto, idx: number) => (
                <ScrollablePhotoItem
                  key={idx}
                  photo={photo}
                  onPhotoPress={onPhotoPress(item?.photos!, idx)}
                />
              ))}
            </View>
          </ScrollView>
        )}
        <View style={styles.infoBlock}>
          <View>
            <Text>Year: </Text>
            <Text style={{ color: theme.colors.primary }} variant="titleMedium">
              {item.year}
            </Text>
          </View>
          <View>
            <Text>Price: </Text>
            <Text style={{ color: theme.colors.primary }} variant="titleMedium">
              {item.price}
            </Text>
          </View>
          <View>
            <Text>Mileage: </Text>
            <Text style={{ color: theme.colors.primary }} variant="titleMedium">
              {item.mileage}
            </Text>
          </View>
          <View>
            <TouchableOpacity hitSlop={hitSlop} onPress={onDeletePress}>
              <Icon name="trash-can-outline" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(VehicleCard);
