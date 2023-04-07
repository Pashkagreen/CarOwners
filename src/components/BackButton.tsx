import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {getStatusBarHeight} from 'react-native-status-bar-height';

type Props = {
  goBack: () => void;
};

const BackButton = ({goBack}: Props) => (
  <TouchableOpacity style={styles.container} onPress={goBack}>
    <Image source={require('../assets/arrow_back.png')} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    left: 10,
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
  },
  image: {
    height: 24,
    width: 24,
  },
});

export default memo(BackButton);
