import React, { FC } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  RefreshControl,
  View,
} from 'react-native';

import {
  Background,
  CustomHeader,
  VehicleCard,
  VehiclesCarouselModal,
} from '@components/index';
import { IVehicle } from '@stores/vehicles/interfaces';
import { theme } from '@theme';
import { TFetchState } from '@types';
import { NativeScrollEvent } from 'react-native/Libraries/Components/ScrollView/ScrollView';
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { Text } from 'react-native-paper';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import styles from './styles';

import { IUploadedPhoto } from '../AddVehicle/AddVehicleContainer';
import VehicleListLoader from './VehicleListLoader';

interface IMyVehicles {
  items: IVehicle[];
  loading: TFetchState;
  refreshing: boolean;
  headerHeight: number;
  cardHeight: number;
  viewerIndex: number;
  isShowViewer: boolean;
  viewerItems: IUploadedPhoto[];
  onPhotoPress: (photos: IUploadedPhoto[], index: number) => () => void;
  setIsShowViewer: (state: boolean) => void;
  onLayout: (e: LayoutChangeEvent) => void;
  onRefresh: () => void;
  deleteVehicle: (item: IVehicle) => void;
  editVehicle: (item: IVehicle) => void;
  addVehicle: () => void;
}

interface RenderContent
  extends Omit<
    IMyVehicles,
    | 'addVehicle'
    | 'viewerIndex'
    | 'isShowViewer'
    | 'viewerItems'
    | 'setIsShowViewer'
  > {
  scrollY: SharedValue<number>;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<IVehicle>);

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
}: RenderContent) => {
  const renderItem = ({ item, index }: ListRenderItemInfo<IVehicle>) => (
    <VehicleCard
      cardHeight={cardHeight}
      index={index}
      item={item}
      scrollY={scrollY}
      onDeletePress={() => deleteVehicle(item)}
      onLayout={onLayout}
      onPhotoPress={onPhotoPress}
      onPress={() => editVehicle(item)}
    />
  );

  if (loading === 'pending') {
    return <VehicleListLoader />;
  }

  if (loading === 'done' && items.length) {
    return (
      <AnimatedFlatList
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: headerHeight },
        ]}
        data={items}
        keyExtractor={(_, idx) => idx.toString()}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={refreshing}
            tintColor={theme.colors.primary}
            onRefresh={onRefresh}
          />
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.flatContainer}
        onScroll={scrollHandler}
      />
    );
  }

  if (loading === 'done' && !items?.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text variant="headlineSmall">Add your first car!</Text>
      </View>
    );
  }
};
const MyVehiclesView: FC<IMyVehicles> = ({
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
}) => {
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
