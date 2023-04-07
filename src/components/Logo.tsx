import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = (): JSX.Element => (
  <Image source={require('../assets/purple_car.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    height: 128,
    marginBottom: 12,
    width: 128,
  },
});

export default memo(Logo);
