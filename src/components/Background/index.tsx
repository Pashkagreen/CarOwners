import React, { memo } from 'react';
import { ImageBackground, View } from 'react-native';

import styles from './style';

type Props = {
  style?: any;
  children: React.ReactNode;
};

const Background = ({ children, style = {} }: Props) => (
  <ImageBackground
    resizeMode="repeat"
    source={require('../../assets/background_dot.png')}
    style={styles.background}>
    <View style={[styles.container, style]}>{children}</View>
  </ImageBackground>
);

export default memo(Background);
