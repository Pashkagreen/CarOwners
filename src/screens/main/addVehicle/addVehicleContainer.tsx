import {useEffect, useState} from 'react';

import {RouteProp} from '@react-navigation/native';

import {ParamList} from '../../../navigation/rootNavigation';
import {useStore} from '../../../store';
import {Navigation} from '../../../types';
import AddVehicleView from './addVehicleView';

type Props = {
  navigation: Navigation;
  route: RouteProp<ParamList, 'AddVehicle'>;
};

const AddVehicleContainer = ({navigation, route}: Props): JSX.Element => {
  const isEdit = route.params?.isEdit;
  const vehicleInfo = route.params?.vehicleInfo;

  const {vehiclesStore} = useStore();

  //vehicleInfo
  const [brand, setBrand] = useState<string | undefined>('');
  const [model, setModel] = useState<string | undefined>('');
  const [year, setYear] = useState<string | undefined>('');
  const [mileage, setMileage] = useState<string | undefined>('');
  const [price, setPrice] = useState<string | undefined>('');

  const createVehicle = async (): Promise<void> => {
    const newData = {
      brand,
      model,
      year,
      mileage,
      price,
    };

    await vehiclesStore.createVehicle(newData);

    goBack();
  };

  const updateVehicle = async (): Promise<void> => {
    const newData = {
      brand,
      model,
      year,
      mileage,
      price,
    };

    await vehiclesStore.updateVehicle(vehicleInfo?.id, newData);

    goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isEdit) {
      setBrand(vehicleInfo?.brand);
      setModel(vehicleInfo?.model);
      setMileage(vehicleInfo?.mileage);
      setPrice(vehicleInfo?.price);
      setYear(vehicleInfo?.year);
    }
  }, [isEdit]);

  return (
    <AddVehicleView
      brand={brand}
      createVehicle={createVehicle}
      goBack={goBack}
      isEdit={isEdit}
      loading={vehiclesStore.state}
      mileage={mileage}
      model={model}
      price={price}
      setBrand={setBrand}
      setMileage={setMileage}
      setModel={setModel}
      setPrice={setPrice}
      setYear={setYear}
      updateVehicle={updateVehicle}
      year={year}
    />
  );
};

export default AddVehicleContainer;
