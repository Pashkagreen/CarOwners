import React, {memo} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

type Props = {
  style?: any;
  children: React.ReactNode;
};

const Background = ({children, style = {}}: Props) => (
  <ImageBackground
    resizeMode="repeat"
    source={require('../assets/background_dot.png')}
    style={styles.background}>
    <View style={[styles.container, style]}>{children}</View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
});

export default memo(Background);
