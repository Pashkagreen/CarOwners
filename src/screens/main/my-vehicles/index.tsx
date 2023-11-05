import { FC, useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { MyGarageStackParams } from '@navigation/roots/my-garage';
import { StackScreenProps } from '@react-navigation/stack';
import { useStore } from '@stores';
import { IVehicle } from '@stores/vehicles/interfaces';
import { observer } from 'mobx-react-lite';

import MyVehiclesView from './view';

import { IUploadedPhoto } from '../add-vehicle';

type TProps = StackScreenProps<MyGarageStackParams, 'MyVehicles'>;

const MyVehiclesContainer: FC<TProps> = ({ navigation }) => {
  let {
    vehiclesStore: { getVehicles, deleteVehicle, vehicles, state },
    userStore: {
      user: { headerHeight },
    },
  } = useStore();

  const [refreshing, setRefreshing] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);

  /**
   * Animation
   */
  const [viewerItems, setViewerItems] = useState<IUploadedPhoto[]>([]);
  const [viewerIndex, setViewerIndex] = useState<number>(0);
  const [isShowViewer, setIsShowViewer] = useState(false);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await getVehicles(true);
    setRefreshing(false);
  };

  const addVehicle = (): void =>
    navigation.navigate('AddVehicle', {
      isEdit: false,
    });

  const editVehicle = (item: IVehicle): void =>
    navigation.navigate('AddVehicle', {
      vehicleInfo: item,
      isEdit: true,
    });

  const onLayout = (event: LayoutChangeEvent): void => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  };

  const onPhotoPress =
    (photos: IUploadedPhoto[], index: number) => (): void => {
      setIsShowViewer(true);

      if (photos) {
        setViewerItems(photos);
        setViewerIndex(index);
      }
    };

  useEffect(() => void getVehicles(false), []);

  return (
    <MyVehiclesView
      addVehicle={addVehicle}
      cardHeight={cardHeight}
      deleteVehicle={deleteVehicle}
      editVehicle={editVehicle}
      headerHeight={headerHeight}
      isShowViewer={isShowViewer}
      items={vehicles}
      loading={state}
      refreshing={refreshing}
      setIsShowViewer={setIsShowViewer}
      viewerIndex={viewerIndex}
      viewerItems={viewerItems}
      onLayout={onLayout}
      onPhotoPress={onPhotoPress}
      onRefresh={onRefresh}
    />
  );
};

export default observer(MyVehiclesContainer);
