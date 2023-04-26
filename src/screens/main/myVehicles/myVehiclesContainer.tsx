import { useEffect, useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { MyGarageParamList } from '../../../navigation/mainStack/myGarageStack';
import { useStore } from '../../../store';
import { Navigation } from '../../../types';
import MyVehiclesView from './myVehiclesView';

type Props = {
  navigation: Navigation;
  route?: RouteProp<MyGarageParamList>;
};

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

  const editVehicle = (item: any) => {
    navigation.navigate('AddVehicle', {
      vehicleInfo: item,
      isEdit: true,
    });
  };

  const deleteVehicle = async (item: any) => {
    await vehiclesStore.deleteVehicle(item);
  };

  useEffect(() => {
    getData();
  }, []);

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
