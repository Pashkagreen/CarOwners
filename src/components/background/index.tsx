import React, { FC } from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';

import styles from './styles';

interface IBackground {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Background: FC<IBackground> = ({ children, style = {} }) => (
  <ImageBackground
    resizeMode="repeat"
    source={require('../../assets/background_dot.png')}
    style={styles.background}>
    <View style={[styles.container, style]}>{children}</View>
  </ImageBackground>
);

export default Background;
