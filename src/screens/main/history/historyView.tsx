import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';

import { Background, HistoryCard } from '../../../components/index';

import { theme } from '../../../core/theme';
import { fetchState, HistoryInterface } from '../../../store/VehiclesStore';
import styles from './style';

interface IHistoryInterface {
  refreshing: boolean;
  onRefresh: () => void;
  loading: fetchState;
  items: HistoryInterface[];
}
const HistoryView = ({
  loading,
  items,
  refreshing,
  onRefresh,
}: IHistoryInterface): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Background style={styles.background}>
      <View style={styles.infoBlock}>
        <Text style={styles.headerText} variant="headlineMedium">
          History of your vehicles
        </Text>
      </View>
      {loading === 'pending' ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      ) : items.length ? (
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
      ) : (
        <View style={styles.loaderContainer}>
          <Text variant="headlineSmall">No history provided.</Text>
        </View>
      )}
    </Background>
  </SafeAreaView>
);

export default HistoryView;
