import { ScrollView, View } from 'react-native';

import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import {
  Background,
  CustomHeader,
  HistoryCard,
} from '../../../components';

import { FetchState, HistoryInterface } from '../../../store/Vehicles/types';
import styles from './style';

interface HistoryProps {
  loading: FetchState;
  headerHeight: number;
  items: HistoryInterface[];
}

interface RenderContent extends HistoryProps {
  scrollY: Animated.Value<number>;
}

const renderContent = ({
  loading,
  items,
  scrollY,
  headerHeight,
}: RenderContent) => {
  if (loading === 'pending') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}>
      </ScrollView>
    );
  }
  if (loading === 'done' && items.length) {
    return (
      <Animated.ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: headerHeight },
        ]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={[styles.flatContainer, { paddingVertical: headerHeight }]}
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
      <CustomHeader
        animated={true}
        headerHeight={headerHeight}
        headerY={headerY}
        text={'History'}
      />
      {renderContent({ loading, items, scrollY, headerHeight })}
    </Background>
  );
};

export default HistoryView;
