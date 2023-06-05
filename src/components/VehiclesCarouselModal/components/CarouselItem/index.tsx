import { memo } from 'react';
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { CARD_LENGTH } from '../../../../core/constants';
import useImageSize, { ImageSize } from '../../../../hooks/useImageSize';
import { SetPhotos } from '../../../../screens/Main/AddVehicle/AddVehicleContainer';
import getStyles from './style';

interface CarouselItemProps {
  item: SetPhotos;
  index: number;
  scrollX: any;
  length: number;
}
const CarouselItem = ({ item, index, scrollX, length }: CarouselItemProps) => {
  const imageSize = useImageSize(item.uri);
  const size = useSharedValue(0.8);
  const styles = getStyles(imageSize as ImageSize, index, length);

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP,
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];
  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP,
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: size.value }],
    opacity: opacity.value,
  }));

  return (
    <TouchableWithoutFeedback key={index}>
      {imageSize && cardStyle ? (
        <Animated.View style={[styles.imageContainer, cardStyle]}>
          <FastImage
            key={item.fullFileName}
            resizeMode="contain"
            source={{ uri: item.uri }}
            style={styles.image}
          />
        </Animated.View>
      ) : (
        <View style={styles.imageContainer}>
          <ActivityIndicator />
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default memo(CarouselItem);
