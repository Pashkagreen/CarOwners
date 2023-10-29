import * as React from 'react';
import { View } from 'react-native';

import { screenWidth, theme } from '@theme';

import getStyles from './styles';

const HistoryCard = () => {
  const styles = getStyles(theme.colors.lightGrey);

  return (
    <View style={styles.row}>
      <View style={styles.image} />
      <View>
        <View style={[styles.line, { width: screenWidth * 0.6 }]} />
        <View style={[styles.line, { width: screenWidth * 0.4 }]} />
        <View style={[styles.line, { width: screenWidth * 0.3 }]} />
      </View>
    </View>
  );
};

export default HistoryCard;
