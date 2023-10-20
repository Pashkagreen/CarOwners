import { FC } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import { Text } from 'react-native-paper';
import Animated, {
  clamp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Background, CustomHeader, HistoryCard } from '../../../components';

import styles from './styles';

import { theme } from '../../../core/theme';
import { IHistory } from '../../../store/vehicles/interfaces';
import { TFetchState } from '../../../types';
import HistoryListLoader from './HistoryCardLoader';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<IHistory>);

interface IHistoryProps {
  loading: TFetchState;
  headerHeight: number;
  items: IHistory[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

const HistoryView: FC<IHistoryProps> = ({
  loading,
  items,
  headerHeight,
  onRefresh,
  isRefreshing,
}) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  /**
   * Create animated styles for Header
   */
  const animatedStyles = useAnimatedStyle(() => {
    const diffClampScroll = clamp(scrollY.value, 0, headerHeight);

    const headerY = interpolate(
      diffClampScroll,
      [0, headerHeight],
      [0, -headerHeight],
    );

    return {
      transform: [{ translateY: headerY }],
    };
  });

  const renderItem: ListRenderItem<IHistory> = ({ item, index }) => (
    <HistoryCard key={item.id} index={index} item={item} />
  );

  const renderEmptyComponent = () => {
    if (loading === 'pending') {
      return;
    }

    return (
      <View style={styles.loaderContainer}>
        <Text variant="headlineSmall">No history provided.</Text>
      </View>
    );
  };

  return (
    <Background style={styles.background}>
      <CustomHeader
        animatedStyles={animatedStyles}
        headerHeight={headerHeight}
        text={'History'}
      />
      <>
        {loading === 'pending' ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.flatContainer]}>
            <HistoryListLoader />
          </ScrollView>
        ) : (
          <AnimatedFlatList
            contentContainerStyle={[
              styles.scrollContainer,
              { paddingBottom: headerHeight },
            ]}
            data={items}
            ListEmptyComponent={renderEmptyComponent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                tintColor={theme.colors.primary}
                onRefresh={onRefresh}
              />
            }
            renderItem={renderItem}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={[styles.flatContainer, { paddingVertical: headerHeight }]}
            onScroll={scrollHandler}
          />
        )}
      </>
    </Background>
  );
};

export default HistoryView;
