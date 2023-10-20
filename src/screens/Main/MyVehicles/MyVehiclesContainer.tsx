import { FC, useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { MyGarageStackParams } from '../../../navigation/MyGarageStack';
import { useStore } from '../../../store';
import { IVehicle } from '../../../store/vehicles/interfaces';
import { SetPhotos } from '../AddVehicle/AddVehicleContainer';
import MyVehiclesView from './MyVehiclesView';

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

  // ======= Animation Section =========
  const [viewerItems, setViewerItems] = useState<SetPhotos[]>([]);
  const [viewerIndex, setViewerIndex] = useState<number>(0);
  const [isShowViewer, setIsShowViewer] = useState(false);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await getData(true);
    setRefreshing(false);
  };

  const getData = async (force: boolean = false): Promise<void> => {
    await getVehicles(force);
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

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  };

  const onPhotoPress = (photos: SetPhotos[], index: number) => () => {
    setIsShowViewer(true);
    if (photos) {
      setViewerItems(photos);
      setViewerIndex(index);
    }
  };

  useEffect(() => {
    void getData();
  }, []);

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
