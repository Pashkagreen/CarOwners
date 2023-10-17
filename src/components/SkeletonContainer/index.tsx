import React, { FC } from 'react';
import { LayoutRectangle, StyleSheet, View } from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import styles from './style';

interface SkeletonProps {
  children: React.ReactElement;
  backgroundColor: string;
  highlightColor: string;
}

const SkeletonContainer: FC<SkeletonProps> = ({
  children,
  backgroundColor,
  highlightColor,
}) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const shared = useSharedValue(0);

  React.useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 1000 }), Infinity);
  }, []);

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
    return (
      <View onLayout={event => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  return (
    <MaskedView
      maskElement={children}
      style={{
        width: layout.width,
        height: layout.height,
      }}>
      <View style={[styles.background, { backgroundColor }]} />
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <MaskedView
          maskElement={
            <LinearGradient
              colors={['transparent', 'black', 'transparent']}
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          }
          style={StyleSheet.absoluteFill}>
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: highlightColor },
            ]}
          />
        </MaskedView>
      </Animated.View>
    </MaskedView>
  );
};

export default SkeletonContainer;
