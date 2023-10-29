import * as React from 'react';
import { ScrollView } from 'react-native';

import { SkeletonContainer } from '@components/index';
import { theme } from '@theme';

import styles from '../styles.ts';

export const HistoryListLoader = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={[styles.flatContainer]}>
    <SkeletonContainer
      backgroundColor={theme.colors.lightGrey}
      highlightColor={theme.colors.white}>
      <>
        {new Array(10).fill(null).map((_, index) => (
          <SkeletonContainer.HistoryCard key={index} />
        ))}
      </>
    </SkeletonContainer>
  </ScrollView>
);

export default HistoryListLoader;
