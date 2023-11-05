import React, { FC, useEffect } from 'react';
import { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import HistoryCard from './components/history-card';
import VehicleCard from './components/vehicle-card';

import styles from './styles';

import skeletonParameters from './data.ts';

interface ISkeleton {
  backgroundColor: string;
  highlightColor: string;
  children: React.ReactElement;
}

type TProps = FC<ISkeleton> & {
  HistoryCard: typeof HistoryCard;
  VehicleCard: typeof VehicleCard;
};

const SkeletonContainer: TProps = ({
  children,
  backgroundColor,
  highlightColor,
}: ISkeleton) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const shared = useSharedValue(0);

  const { absoluteFill, start, end, gradientColors } = skeletonParameters;

  const onLayoutChange = ({
    nativeEvent: { layout: viewLayout },
  }: LayoutChangeEvent): void => setLayout(viewLayout);

  /**
   * Skeleton animation
   */
  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 1000 }), Infinity);
  }, []);

  /**
   * Skeleton style
   */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [layout ? -layout.width : 0, layout ? layout.width : 0],
        ),
      },
    ],
  }));

  if (!layout) {
    return <View onLayout={onLayoutChange}>{children}</View>;
  }

  return (
    <MaskedView
      maskElement={children}
      style={{
        width: layout.width,
        height: layout.height,
      }}>
      <View style={[styles.background, { backgroundColor }]} />
      <Animated.View style={[absoluteFill, animatedStyle]}>
        <MaskedView
          maskElement={
            <LinearGradient
              colors={gradientColors}
              end={end}
              start={start}
              style={absoluteFill}
            />
          }
          style={absoluteFill}>
          <View style={[absoluteFill, { backgroundColor: highlightColor }]} />
        </MaskedView>
      </Animated.View>
    </MaskedView>
  );
};

SkeletonContainer.HistoryCard = HistoryCard;
SkeletonContainer.VehicleCard = VehicleCard;

export default SkeletonContainer;
