import React, { memo } from 'react';
import { Image } from 'react-native';

import styles from './styles';

const Logo = () => (
  <Image source={require('../../assets/purple_car.png')} style={styles.image} />
);

export default memo(Logo);
