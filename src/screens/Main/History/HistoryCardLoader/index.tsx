import * as React from 'react';
import { View } from 'react-native';

import { SkeletonContainer } from '../../../../components/index';

import getStyles from './styles';

import { screenWidth } from '../../../../core/theme';

const backgroundColor = 'lightgrey';
const highlightColor = 'white';

const HistoryCardSkeleton = () => {
  const styles = getStyles(backgroundColor);

  return (
    <View style={styles.row}>
      <View style={styles.image} />
      <View>
        <View style={[styles.line, { width: screenWidth * 0.5 }]} />
        <View style={[styles.line, { width: screenWidth * 0.3 }]} />
        <View style={[styles.line, { width: screenWidth * 0.2 }]} />
      </View>
    </View>
  );
};

export const HistoryListLoader = () => {
  const styles = getStyles(backgroundColor);

  return (
    <SkeletonContainer
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}>
      <View style={styles.container}>
        {new Array(10).fill(null).map((_, index) => (
          <HistoryCardSkeleton key={index} />
        ))}
      </View>
    </SkeletonContainer>
  );
};

export default HistoryListLoader;
