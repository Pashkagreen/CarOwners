import * as React from 'react';
import { View } from 'react-native';

import { SkeletonContainer } from '@components/index';
import { screenWidth } from '@theme';

import getStyles from './styles';

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

export const HistoryListLoader = () => (
  <SkeletonContainer
    backgroundColor={backgroundColor}
    highlightColor={highlightColor}>
    <>
      {new Array(10).fill(null).map((_, index) => (
        <HistoryCardSkeleton key={index} />
      ))}
    </>
  </SkeletonContainer>
);

export default HistoryListLoader;
