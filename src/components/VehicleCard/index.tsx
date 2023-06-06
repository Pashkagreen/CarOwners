import { memo } from 'react';
import { LayoutChangeEvent, ScrollView, View } from 'react-native';
import { Animated, TouchableOpacity } from 'react-native';

import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { hitSlop, theme } from '../../core/theme';
import { SetPhotos } from '../../screens/Main/AddVehicle/AddVehicleContainer';
import { VehicleInterface } from '../../store/Vehicles/types';
import styles from './style';

interface VehicleCardProps {
  item: VehicleInterface;
  index: number;
  onPress: any;
  onDeletePress: any;
  onPhotoPress: (photos: SetPhotos[], index: number) => () => void;
  onLayout: (e: LayoutChangeEvent) => void;
  cardHeight: number;
  scrollY: any;
}

const VehicleCard = ({
  item,
  index,
  onPress,
  onDeletePress,
  onPhotoPress,
  onLayout,
  cardHeight,
  scrollY,
}: VehicleCardProps): JSX.Element => {
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
              {item.photos.map((el, idx) => (
                <TouchableOpacity
                  key={el.uri}
                  onPress={onPhotoPress(item.photos!, idx)}>
                  <FastImage
                    resizeMode="cover"
                    source={{ uri: el.thumbnailUri }}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
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
