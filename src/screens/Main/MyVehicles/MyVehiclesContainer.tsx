import { useEffect, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { MyGarageStackParams } from '../../../navigation/MyGarageStack';
import { useStore } from '../../../store';
import { VehicleInterface } from '../../../store/Vehicles/types';
import MyVehiclesView from './MyVehiclesView';

type Props = StackScreenProps<MyGarageStackParams, 'MyVehicles'>;

const MyVehiclesContainer = ({ navigation }: Props): JSX.Element => {
  let { vehiclesStore } = useStore();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData(true);
    setRefreshing(false);
  };

  const getData = async (force = false) => {
    await vehiclesStore.getVehicles(force);
  };

  const addVehicle = () => {
    navigation.navigate('AddVehicle', {
      isEdit: false,
    });
  };

  const editVehicle = (item: VehicleInterface) => {
    navigation.navigate('AddVehicle', {
      vehicleInfo: item,
      isEdit: true,
    });
  };

  const deleteVehicle = async (item: VehicleInterface) => {
    await vehiclesStore.deleteVehicle(item);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('vehicles', vehiclesStore.vehicles);

  return (
    <MyVehiclesView
      addVehicle={addVehicle}
      deleteVehicle={deleteVehicle}
      editVehicle={editVehicle}
      items={vehiclesStore.vehicles}
      loading={vehiclesStore.state}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default observer(MyVehiclesContainer);
