import * as React from 'react';
import { View } from 'react-native';

import { theme } from '@theme';

import getStyles from './styles';

const VehicleCard = () => {
  const styles = getStyles(theme.colors.lightGrey);

  return (
    <View style={styles.container}>
      <View style={styles.title} />
      <View style={styles.image} />
      <View style={styles.row}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default VehicleCard;
