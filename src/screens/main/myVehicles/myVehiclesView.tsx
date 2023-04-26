import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import {ActivityIndicator, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Background, VehicleCard} from '../../../components';

import {hitSlop, theme} from '../../../core/theme';
import {fetchState, VehicleInterface} from '../../../store/VehiclesStore';
import styles from './myVehiclesStyles';

interface MyVehiclesInterface {
  items: VehicleInterface[];
  loading: fetchState;
  refreshing: boolean;
  onRefresh: () => void;
  deleteVehicle: (item: VehicleInterface) => void;
  editVehicle: (item: VehicleInterface) => void;
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
      {loading === 'pending' ? (
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

export default MyVehiclesView;
