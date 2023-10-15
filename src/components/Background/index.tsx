import React, { memo } from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';

import styles from './style';

interface Props {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Background = ({ children, style = {} }: Props) => (
  <ImageBackground
    resizeMode="repeat"
    source={require('../../assets/background_dot.png')}
    style={styles.background}>
    <View style={[styles.container, style]}>{children}</View>
  </ImageBackground>
);

export default memo(Background);
