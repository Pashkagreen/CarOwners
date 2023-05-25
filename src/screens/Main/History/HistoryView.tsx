import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';

import { Background, HistoryCard } from '../../../components/index';

import { theme } from '../../../core/theme';
import { FetchState, HistoryInterface } from '../../../store/Vehicles/types';
import styles from './style';

interface HistoryProps {
  refreshing: boolean;
  onRefresh: () => void;
  loading: FetchState;
  items: HistoryInterface[];
}

const renderContent = ({
  loading,
  items,
  refreshing,
  onRefresh,
}: HistoryProps) => {
  if (loading === 'pending') {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  if (loading === 'done' && items.length) {
    return (
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={refreshing}
            tintColor={theme.colors.primary}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => <HistoryCard item={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}
      />
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
  refreshing,
  onRefresh,
}: HistoryProps): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Background style={styles.background}>
      {renderContent({ loading, items, refreshing, onRefresh })}
    </Background>
  </SafeAreaView>
);

export default HistoryView;
