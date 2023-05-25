import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Background, VehicleCard } from '../../../components/index';

import { hitSlop, theme } from '../../../core/theme';
import { FetchState, VehicleInterface } from '../../../store/Vehicles/types';
import styles from './style';

interface MyVehiclesProps {
  items: VehicleInterface[];
  loading: FetchState;
  refreshing: boolean;
  onRefresh: () => void;
  deleteVehicle: (item: VehicleInterface) => void;
  editVehicle: (item: VehicleInterface) => void;
  addVehicle: () => void;
}

type RenderContent = Omit<MyVehiclesProps, 'addVehicle'>;

const renderContent = ({
  loading,
  items,
  refreshing,
  onRefresh,
  deleteVehicle,
  editVehicle,
}: RenderContent): React.ReactNode => {
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
        keyExtractor={({ id }) => id}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={refreshing}
            tintColor={theme.colors.primary}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <VehicleCard
            item={item}
            onDeletePress={deleteVehicle(item)}
            onPress={editVehicle(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}
      />
    );
  }
  if (loading === 'done' && !items.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text variant="headlineSmall">Add your first car!</Text>
      </View>
    );
  }
};
const MyVehiclesView = ({
  items,
  loading,
  refreshing,
  onRefresh,
  addVehicle,
  editVehicle,
  deleteVehicle,
}: MyVehiclesProps): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Background style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText} variant="headlineSmall">
          My Vehicles
        </Text>
        <TouchableOpacity hitSlop={hitSlop} onPress={addVehicle}>
          <Icon name={'plus'} size={24} />
        </TouchableOpacity>
      </View>
      {renderContent({
        items,
        loading,
        refreshing,
        onRefresh,
        editVehicle,
        deleteVehicle,
      })}
    </Background>
  </SafeAreaView>
);

export default MyVehiclesView;
