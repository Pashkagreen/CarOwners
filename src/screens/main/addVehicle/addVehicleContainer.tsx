import {useEffect, useState} from 'react';

import {RouteProp} from '@react-navigation/native';

import VehiclesService from '../../../services/vehicles';

import {flashMessage} from '../../../core/utils';

import {ParamList} from '../../../navigation/rootNavigation';
import {Navigation} from '../../../types';
import AddVehicleView from './addVehicleView';

type Props = {
  navigation: Navigation;
  route: RouteProp<ParamList, 'AddVehicle'>;
};

const AddVehicleContainer = ({navigation, route}: Props): JSX.Element => {
  const isEdit = route.params?.isEdit;
  const vehicleInfo = route.params?.vehicleInfo;

  const [loading, setLoading] = useState(false);

  //vehicleInfo
  const [brand, setBrand] = useState<string | undefined>('');
  const [model, setModel] = useState<string | undefined>('');
  const [year, setYear] = useState<string | undefined>('');
  const [mileage, setMileage] = useState<string | undefined>('');
  const [price, setPrice] = useState<string | undefined>('');

  const createVehicle = async (): Promise<void> => {
    setLoading(true);

    try {
      const newData = {
        brand,
        model,
        year,
        mileage,
        price,
      };

      const {data} = await VehiclesService.createVehicle(newData);

      if (data.id) {
        flashMessage({
          type: 'success',
          message: 'Congratulations!',
          description: 'You successfully added a vehicle.',
        });
        navigation.navigate('MyVehicles', {
          afterChange: true,
        });
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

  const updateVehicle = async (): Promise<void> => {
    setLoading(true);

    try {
      const newData = {
        brand,
        model,
        year,
        mileage,
        price,
      };

      const {data} = await VehiclesService.updateVehicle(
        vehicleInfo?.id,
        newData,
      );

      if (data.id) {
        flashMessage({
          type: 'success',
          message: 'Congratulations!',
          description: 'You successfully updated a vehicle info.',
        });
        navigation.navigate('MyVehicles', {
          afterChange: true,
        });
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
      loading={loading}
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
