import {useCallback, useEffect, useState} from 'react';

import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import VehiclesService from '../../../services/vehicles';
import {VehicleInfoInterface} from '../../../services/vehicles';

import {flashMessage} from '../../../core/utils';

import {ParamList} from '../../../navigation/rootNavigation';
import {Navigation} from '../../../types';
import MyVehiclesView from './myVehiclesView';

type Props = {
  navigation: Navigation;
  route: RouteProp<ParamList, 'MyVehicles'>;
};

const MyVehiclesContainer = ({navigation, route}: Props): JSX.Element => {
  let afterChange = route.params?.afterChange;

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<VehicleInfoInterface[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData(true);
    setRefreshing(false);
  };

  const getData = async (force = false) => {
    if (!force) {
      setLoading(true);
    }
    try {
      const data: VehicleInfoInterface[] = await VehiclesService.getAll();
      if (data.length) {
        setItems(data);
      }
    } catch (error) {
      setLoading(false);
      flashMessage({
        type: 'danger',
        message: 'Unknown error occured!',
      });
    }
    setLoading(false);
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
    setLoading(true);
    try {
      await VehiclesService.deleteVehicle(item?.id);
      flashMessage({
        type: 'info',
        message: 'Your vehicle deleted.',
      });
      await getData(true);
    } catch (error) {
      setLoading(false);
      flashMessage({
        type: 'danger',
        message: 'Unknown error occured!',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (afterChange) {
        onRefresh();
      }

      // return () => {
      //   afterChange = undefined;
      // };
    }, [afterChange]),
  );

  return (
    <MyVehiclesView
      addVehicle={addVehicle}
      deleteVehicle={deleteVehicle}
      editVehicle={editVehicle}
      items={items}
      loading={loading}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default observer(MyVehiclesContainer);
