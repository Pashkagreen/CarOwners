import { ScrollView, View } from 'react-native';

import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import {
  Background,
  HistoryCard,
  HistoryCardSkeleton,
} from '../../../components';
import Header from './components/Header';

import { FetchState, HistoryInterface } from '../../../store/Vehicles/types';
import styles from './style';

interface HistoryProps {
  loading: FetchState;
  headerHeight: number;
  items: HistoryInterface[];
}

interface RenderContent extends Omit<HistoryProps, 'headerHeight'> {
  scrollY: Animated.Value<number>;
}

const renderContent = ({ loading, items, scrollY }: RenderContent) => {
  if (loading === 'pending') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}>
        <HistoryCardSkeleton amount={8} loading={loading === 'pending'} />
      </ScrollView>
    );
  }
  if (loading === 'done' && items.length) {
    return (
      <Animated.ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}>
        {items.map(item => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </Animated.ScrollView>
    );
  }
  if (loading === 'done' && !items.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text variant="headlineSmall">No history provided.</Text>
      </View>
    );
  }
};

const HistoryView = ({
  loading,
  items,
  headerHeight,
}: HistoryProps): JSX.Element => {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, headerHeight);
  const headerY = Animated.interpolateNode(diffClampScrollY, {
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });

  return (
    <Background style={styles.background}>
      <Header headerHeight={headerHeight} headerY={headerY} />
      {renderContent({ loading, items, scrollY })}
    </Background>
  );
};

export default HistoryView;
