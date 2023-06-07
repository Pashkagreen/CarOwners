import React, { memo } from 'react';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import styles from './style';

interface SkeletonProps {
  loading: boolean;
  amount: number;
}

const renderSkeleton = (loading: boolean, amount: number) => {
  const elements = Array.from({ length: amount }, (_, index) => (
    <React.Fragment key={index}>
      <SkeletonContent
        containerStyle={styles.container}
        isLoading={loading}
        layout={[
          {
            key: 'wrapper',
            width: '100%',
            flexDirection: 'column',
            gap: 10,
            children: [
              { key: 'model', width: '90%', height: 20 },
              {
                key: 'platform',
                width: '80%',
                height: 60,
              },
              {
                key: 'releaseDate',
                width: '70%',
                height: 20,
              },
            ],
          },
        ]}
      />
    </React.Fragment>
  ));

  return elements;
};

const HistoryCardSkeleton = ({ loading, amount }: SkeletonProps) => (
  <>{renderSkeleton(loading, amount)}</>
);

export default memo(HistoryCardSkeleton);
