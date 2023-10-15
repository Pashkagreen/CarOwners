import { View } from 'react-native';

import { Controller, UseFormHandleSubmit } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Background,
  Button,
  MultiPicker,
  TextInput,
} from '../../../components/index';

import { hitSlop } from '../../../core/theme';
import { FetchState, VehicleInterface } from '../../../store/Vehicles/types';
import { LocalPhotosState, SetPhotos } from './AddVehicleContainer';
import { FormData } from './AddVehicleContainer';
import styles from './style';

interface AddVehiclesProps {
  control: any;
  onSubmit: (data: FormData) => void;
  handleSubmit: UseFormHandleSubmit<FormData>;
  loading: FetchState;
  isEdit?: boolean;
  vehicleInfo?: VehicleInterface;
  errors: any;
  photos: LocalPhotosState[];
  onUploadPhotos: (photos: SetPhotos[]) => void;
  onFinishLoadPhotos: (photos: SetPhotos[]) => void;
  setLoadingPhotos: (state: boolean) => void;
}

const AddVehicleView = ({
  control,
  onSubmit,
  handleSubmit,
  vehicleInfo,
  loading,
  isEdit,
  photos,
  errors,
  onFinishLoadPhotos,
  onUploadPhotos,
}: AddVehiclesProps): JSX.Element => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <Controller
        control={control}
        defaultValue={isEdit ? vehicleInfo?.brand : ''}
        name="brand"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors?.brand}
            errorText={errors?.brand?.message}
            label="Brand"
            mode="outlined"
            style={styles.inputBlock}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        rules={{
          required: true,
        }}
      />
      <Controller
        control={control}
        defaultValue={isEdit ? vehicleInfo?.model : ''}
        name="model"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors?.model}
            errorText={errors?.model?.message}
            label="Model"
            mode="outlined"
            style={styles.inputBlock}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={isEdit ? vehicleInfo?.year : ''}
        name="year"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors?.year}
            errorText={errors?.year?.message}
            keyboardType="number-pad"
            label="Year"
            mode="outlined"
            style={styles.inputBlock}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={isEdit ? vehicleInfo?.mileage : ''}
        name="mileage"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors?.mileage}
            errorText={errors?.mileage?.message}
            keyboardType="number-pad"
            label="Mileage"
            mode="outlined"
            style={styles.inputBlock}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue={isEdit ? vehicleInfo?.price : ''}
        name="price"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors?.price}
            errorText={errors?.price?.message}
            keyboardType="number-pad"
            label="Price"
            mode="outlined"
            style={styles.inputBlock}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <MultiPicker
        text={`Upload your vehicle photos. Max ${photos?.length}/15`}
        value={vehicleInfo?.photos}
        onFinishLoadPhotos={onFinishLoadPhotos}
        onUploadPhotos={onUploadPhotos}
      />
      <View />
      <Button
        hitSlop={hitSlop}
        loading={loading === 'pending'}
        mode="contained"
        style={styles.btn}
        onPress={handleSubmit(onSubmit)}>
        {isEdit ? 'Update vehicle info' : 'Create a vehicle'}
      </Button>
    </Background>
  </KeyboardAwareScrollView>
);

export default AddVehicleView;
