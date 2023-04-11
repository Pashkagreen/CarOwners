import {memo} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {ActivityIndicator, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {VehicleInfoInterface} from '../../../services/vehicles';

import {Background, VehicleCard} from '../../../components';

import {hitSlop, theme} from '../../../core/theme';

interface MyVehiclesInterface {
  items: VehicleInfoInterface[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  deleteVehicle: (item: VehicleInfoInterface) => void;
  editVehicle: (item: VehicleInfoInterface) => void;
  addVehicle: () => void;
}
const MyVehiclesView = ({
  items,
  loading,
  refreshing,
  onRefresh,
  addVehicle,
  editVehicle,
  deleteVehicle,
}: MyVehiclesInterface): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Background style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText} variant="headlineMedium">
          My Vehicles
        </Text>
        <TouchableOpacity hitSlop={hitSlop} onPress={addVehicle}>
          <Icon name={'plus'} size={24} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      ) : items.length ? (
        <FlatList
          key={({item}) => item.id}
          data={items}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={refreshing}
              tintColor={theme.colors.primary}
              onRefresh={onRefresh}
            />
          }
          renderItem={({item}) => (
            <VehicleCard
              item={item}
              onDeletePress={() => deleteVehicle(item)}
              onPress={() => editVehicle(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={styles.flatContainer}
        />
      ) : (
        <View style={styles.loaderContainer}>
          <Text variant="headlineSmall">Add your first car!</Text>
        </View>
      )}
    </Background>
  </SafeAreaView>
);

export default memo(MyVehiclesView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatContainer: {
    flex: 1,
    marginTop: 16,
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});
