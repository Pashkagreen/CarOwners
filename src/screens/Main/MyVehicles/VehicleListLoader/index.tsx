import * as React from 'react';
import { ScrollView } from 'react-native';

import { theme } from '@theme';

import { SkeletonContainer } from '@components/index.ts';

import styles from '../styles.ts';

export const VehicleListLoader = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={[styles.flatContainer]}>
    <SkeletonContainer
      backgroundColor={theme.colors.lightGrey}
      highlightColor={theme.colors.white}>
      <>
        {new Array(10).fill(null).map((_, index) => (
          <SkeletonContainer.VehicleCard key={index} />
        ))}
      </>
    </SkeletonContainer>
  </ScrollView>
);

export default VehicleListLoader;
