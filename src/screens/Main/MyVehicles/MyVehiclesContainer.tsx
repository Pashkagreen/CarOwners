import { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { MyGarageStackParams } from '../../../navigation/MyGarageStack';
import { useStore } from '../../../store';
import { VehicleInterface } from '../../../store/Vehicles/types';
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
      items={vehiclesStore.vehicles}
      loading={vehiclesStore.state}
      refreshing={refreshing}
      onLayout={onLayout}
      onRefresh={onRefresh}
    />
  );
};

export default observer(MyVehiclesContainer);
