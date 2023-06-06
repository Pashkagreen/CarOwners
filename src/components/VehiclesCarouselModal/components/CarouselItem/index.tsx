import { memo, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import Lottie from 'lottie-react-native';
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

  const animationRef = useRef<Lottie>(null);

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

  useEffect(() => {
    animationRef.current?.play(0, 5000);
  }, []);

  return (
    <TouchableWithoutFeedback key={index}>
      <Animated.View style={[styles.imageContainer, cardStyle]}>
        <FastImage
          key={item.fullFileName}
          resizeMode="contain"
          source={{ uri: item.uri }}
          style={styles.image}
        />
        <View style={styles.loaderContainer}>
          <Lottie
            ref={animationRef}
            autoPlay
            loop
            source={require('../../../../assets/carousel_loading.json')}
            style={styles.lottieLoader}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CarouselItem);
