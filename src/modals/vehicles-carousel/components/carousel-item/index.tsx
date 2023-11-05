import { FC, memo, useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { CARD_LENGTH } from '@constants';
import useImageSize, { IImageSize } from '@hooks/use-image-size';
import { IUploadedPhoto } from '@screens/main/add-vehicle';
import Lottie from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import getStyles from './styles.ts';

interface ICarouselItem {
  item: IUploadedPhoto;
  index: number;
  scrollX: number;
  length: number;
}

const CarouselItem: FC<ICarouselItem> = ({ item, index, scrollX, length }) => {
  const [loading, setLoading] = useState(false);
  const animationRef = useRef<Lottie>(null);

  const imageSize = useImageSize(item.uri);
  const styles = getStyles(imageSize as IImageSize, index, length);

  const size = useSharedValue(0.8);
  const opacity = useSharedValue(1);

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
    if (animationRef.current) {
      animationRef.current?.play(0, 8000);
    }
  }, []);

  return (
    <TouchableWithoutFeedback key={index}>
      <Animated.View style={[styles.imageContainer, cardStyle]}>
        <FastImage
          key={item.fullFileName}
          resizeMode="contain"
          source={{ uri: item.uri }}
          style={styles.image}
          onLoadStart={() => setLoading(true)}
        />
        {loading && (
          <View style={styles.loaderContainer}>
            <Lottie
              ref={animationRef}
              autoPlay
              loop
              source={require('@assets/carousel_loading.json')}
              style={styles.lottieLoader}
            />
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CarouselItem);
