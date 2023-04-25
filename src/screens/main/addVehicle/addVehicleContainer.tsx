import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import {vehiclesSchema} from '../../../core/validators';
import {ParamList} from '../../../navigation/rootNavigation';
import {useStore} from '../../../store';
import {Navigation} from '../../../types';
import AddVehicleView from './addVehicleView';

type Props = {
  navigation: Navigation;
  route: RouteProp<ParamList, 'AddVehicle'>;
};

export type FormData = yup.InferType<typeof vehiclesSchema>;

const AddVehicleContainer = ({navigation, route}: Props): JSX.Element => {
  const isEdit = route.params?.isEdit;
  const vehicleInfo = route.params?.vehicleInfo;

  const {vehiclesStore} = useStore();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(vehiclesSchema),
  });

  const onSubmit = (data: FormData) => {
    isEdit ? updateVehicle(data) : createVehicle(data);
  };

  const createVehicle = async (newData: any): Promise<void> => {
    await vehiclesStore.createVehicle(newData);

    goBack();
  };

  const updateVehicle = async (newData: any): Promise<void> => {
    await vehiclesStore.updateVehicle(vehicleInfo?.id, newData);

    goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <AddVehicleView
      control={control}
      errors={errors}
      goBack={goBack}
      handleSubmit={handleSubmit}
      isEdit={isEdit}
      loading={vehiclesStore.state}
      vehicleInfo={vehicleInfo}
      onSubmit={onSubmit}
    />
  );
};

export default AddVehicleContainer;
