import React from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import { Text } from 'react-native-paper';

import {
  Background,
  CustomHeader,
  VehicleCard,
  VehicleCardSkeleton,
} from '../../../components';

import { theme } from '../../../core/theme';
import { FetchState, VehicleInterface } from '../../../store/Vehicles/types';
import styles from './style';

interface MyVehiclesProps {
  items: VehicleInterface[];
  loading: FetchState;
  refreshing: boolean;
  headerHeight: number;
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
  headerHeight,
  onRefresh,
  deleteVehicle,
  editVehicle,
}: RenderContent): React.ReactNode => {
  if (loading === 'pending') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}>
        <VehicleCardSkeleton amount={8} loading={loading === 'pending'} />
      </ScrollView>
    );
  }
  if (loading === 'done' && items.length) {
    return (
      <FlatList
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: headerHeight },
        ]}
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
  headerHeight,
  onRefresh,
  addVehicle,
  editVehicle,
  deleteVehicle,
}: MyVehiclesProps): JSX.Element => (
  <Background style={styles.background}>
    <CustomHeader
      animated={false}
      headerHeight={headerHeight}
      iconName={'plus'}
      rightButton={true}
      style={styles.header}
      text={'My Vehicles'}
      onIconPress={addVehicle}
    />
    {renderContent({
      items,
      loading,
      refreshing,
      headerHeight,
      onRefresh,
      editVehicle,
      deleteVehicle,
    })}
  </Background>
);

export default MyVehiclesView;
