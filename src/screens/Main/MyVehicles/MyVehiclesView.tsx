import React from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import { Text } from 'react-native-paper';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {
  Background,
  CustomHeader,
  VehicleCard,
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
  scrollHandler: any;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const renderContent = ({
  loading,
  items,
  refreshing,
  headerHeight,
  cardHeight,
  scrollY,
  scrollHandler,
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
        style={styles.flatContainer}
      />
    );
  }
  if (loading === 'done' && items.length) {
    return (
      <AnimatedFlatList
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: headerHeight },
        ]}
        data={items}
        keyExtractor={(i, idx) => idx.toString()}
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
            item={item as VehicleInterface}
            scrollY={scrollY}
            onDeletePress={deleteVehicle(item as VehicleInterface)}
            onLayout={onLayout}
            onPhotoPress={onPhotoPress}
            onPress={editVehicle(item as VehicleInterface)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}
        onScroll={scrollHandler}
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
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <>
      {isShowViewer && (
        <VehiclesCarouselModal
          data={viewerItems}
          isShowViewer={isShowViewer}
          setIsShowViewer={setIsShowViewer}
          viewerIndex={viewerIndex}
        />
      )}
      <Background style={styles.background}>
        <CustomHeader
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
          scrollY,
          onRefresh,
          editVehicle,
          deleteVehicle,
          onLayout,
          scrollHandler,
          onPhotoPress,
        })}
      </Background>
    </>
  );
};

export default MyVehiclesView;
