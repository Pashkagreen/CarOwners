import React, { memo, useState } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

import FastImage, { ImageStyle, Source } from 'react-native-fast-image';

import styles from './style';

export interface SourceType extends Source {
  uri?: string;
  thumbnailUri?: string;
  path: string;
  filename: string;
}

interface ProgressiveImageProps {
  source: SourceType;
  defaultSource?: Source | null;
  imageStyle: (ViewStyle | ImageStyle)[];
  onlyThumbnail?: boolean;
  withoutAnim?: boolean;
}

const ProgressiveImage = ({
  source,
  defaultSource = null,
  imageStyle,
  onlyThumbnail = false,
  withoutAnim = false,
}: ProgressiveImageProps) => {
  const [imageOpacity] = useState(new Animated.Value(0));
  const [thumbnailOpacity] = useState(new Animated.Value(0));

  const onLoadThumbnail = () => {
    if (withoutAnim) return;
    Animated.timing(thumbnailOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const onLoadImage = () => {
    if (withoutAnim) return;
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[imageStyle, styles.container]}>
      <Animated.View
        style={[
          styles.image,
          onlyThumbnail || withoutAnim ? {} : { opacity: thumbnailOpacity },
        ]}>
        {source?.thumbnailUri || defaultSource ? (
          <FastImage
            fallback={!onlyThumbnail}
            resizeMode="cover"
            source={
              source?.thumbnailUri
                ? { uri: source.thumbnailUri }
                : defaultSource || undefined
            }
            style={styles.imageWrapper}
            onLoad={onLoadThumbnail}
          />
        ) : null}
      </Animated.View>
      {onlyThumbnail || !source?.uri ? null : (
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.image, { opacity: withoutAnim ? 1 : imageOpacity }]}>
          <FastImage
            resizeMode="cover"
            source={
              source?.uri ? { uri: source.uri } : defaultSource || undefined
            }
            style={styles.imageWrapper}
            onLoad={onLoadImage}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default memo(ProgressiveImage);
