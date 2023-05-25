import React, { memo } from 'react';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import styles from './style';

interface GameItemSkeletonProps {
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
            flexDirection: 'row',
            key: 'wrapper',
            width: '100%',
            children: [
              {
                key: 'title',
                width: '60%',
                margin: 12,
                children: [
                  { key: 'genre', width: '100%', height: 20, marginBottom: 12 },
                  {
                    key: 'platform',
                    width: '90%',
                    height: 50,
                    marginBottom: 12,
                  },
                  {
                    key: 'year',
                    width: '90%',
                    height: 50,
                  },
                ],
              },
              { key: 'image', width: 120, height: '100%', borderRadius: 4 },
            ],
          },
        ]}
      />
    </React.Fragment>
  ));

  return elements;
};

const VehicleCardSkeleton = ({ loading, amount }: GameItemSkeletonProps) => (
  <>{renderSkeleton(loading, amount)}</>
);

export default memo(VehicleCardSkeleton);
