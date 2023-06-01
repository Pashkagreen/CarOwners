import { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { MyGarageStackParams } from '../../../navigation/MyGarageStack';
import { useStore } from '../../../store';
import { VehicleInterface } from '../../../store/Vehicles/types';
import { SetPhotos } from '../AddVehicle/AddVehicleContainer';
import MyVehiclesView from './MyVehiclesView';

type Props = StackScreenProps<MyGarageStackParams, 'MyVehicles'>;

const MyVehiclesContainer = ({ navigation }: Props): JSX.Element => {
  let {
    vehiclesStore,
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

  const onRefresh = async () => {
    setRefreshing(true);
    getData(true);
    setRefreshing(false);
  };

  const getData = async (force: boolean = false) => {
    await vehiclesStore.getVehicles(force);
  };

  const addVehicle = () => {
    navigation.navigate('AddVehicle', {
      isEdit: false,
    });
  };

  const editVehicle = (item: VehicleInterface) => () => {
    navigation.navigate('AddVehicle', {
      vehicleInfo: item,
      isEdit: true,
    });
  };

  const deleteVehicle = (item: VehicleInterface) => async () => {
    await vehiclesStore.deleteVehicle(item);
  };

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
    getData();
  }, []);

  return (
    <MyVehiclesView
      addVehicle={addVehicle}
      cardHeight={cardHeight}
      deleteVehicle={deleteVehicle}
      editVehicle={editVehicle}
      headerHeight={headerHeight}
      isShowViewer={isShowViewer}
      items={vehiclesStore.vehicles}
      loading={vehiclesStore.state}
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
