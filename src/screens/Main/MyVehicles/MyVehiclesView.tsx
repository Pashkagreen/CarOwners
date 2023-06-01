import React, { useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import { Text } from 'react-native-paper';

import {
  Background,
  CustomHeader,
  VehicleCard,
  VehicleCardSkeleton,
  VehiclesCarouselModal,
} from '../../../components';

import { theme } from '../../../core/theme';
import { FetchState, VehicleInterface } from '../../../store/Vehicles/types';
import { SetPhotos } from '../AddVehicle/AddVehicleContainer';
import styles from './style';

interface MyVehiclesProps {
  items: VehicleInterface[];
  loading: FetchState;
  refreshing: boolean;
  headerHeight: number;
  cardHeight: number;
  viewerIndex: number;
  isShowViewer: boolean;
  viewerItems: SetPhotos[];
  onPhotoPress: (photos: SetPhotos[], index: number) => () => void;
  setIsShowViewer: (state: boolean) => void;
  onLayout: (e: LayoutChangeEvent) => void;
  onRefresh: () => void;
  deleteVehicle: (item: VehicleInterface) => () => void;
  editVehicle: (item: VehicleInterface) => () => void;
  addVehicle: () => void;
}

interface RenderContent
  extends Omit<
    MyVehiclesProps,
    | 'addVehicle'
    | 'viewerIndex'
    | 'isShowViewer'
    | 'viewerItems'
    | 'setIsShowViewer'
  > {
  scrollY: any;
}

const renderContent = ({
  loading,
  items,
  refreshing,
  headerHeight,
  cardHeight,
  scrollY,
  onPhotoPress,
  onLayout,
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
      <Animated.FlatList
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
        renderItem={({ item, index }) => (
          <VehicleCard
            cardHeight={cardHeight}
            index={index}
            item={item}
            scrollY={scrollY}
            onDeletePress={deleteVehicle(item)}
            onLayout={onLayout}
            onPhotoPress={onPhotoPress}
            onPress={editVehicle(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
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
  cardHeight,
  onPhotoPress,
  isShowViewer,
  viewerIndex,
  viewerItems,
  setIsShowViewer,
  onLayout,
  onRefresh,
  addVehicle,
  editVehicle,
  deleteVehicle,
}: MyVehiclesProps): JSX.Element => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      {isShowViewer && (
        <VehiclesCarouselModal
          data={viewerItems}
          index={viewerIndex}
          isShowViewer={isShowViewer}
          setIsShowViewer={setIsShowViewer}
        />
      )}
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
          cardHeight,
          loading,
          refreshing,
          headerHeight,
          onRefresh,
          editVehicle,
          deleteVehicle,
          onLayout,
          scrollY,
          onPhotoPress,
        })}
      </Background>
    </>
  );
};

export default MyVehiclesView;
