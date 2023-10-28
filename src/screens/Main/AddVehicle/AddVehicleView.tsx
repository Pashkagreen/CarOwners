import { FC } from 'react';

import { Background, Button, MultiPicker, TextInput } from '@components/index';
import { IVehicle } from '@stores/vehicles/interfaces';
import { hitSlop } from '@theme';
import { TFetchState } from '@types';
import { Controller, UseFormHandleSubmit } from 'react-hook-form';
import { Image as IImage } from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';

import { IUploadedPhoto } from './AddVehicleContainer';
import { FormData } from './AddVehicleContainer';

interface IAddVehicles {
  control: any;
  onSubmit: (data: FormData) => void;
  handleSubmit: UseFormHandleSubmit<FormData>;
  loading: TFetchState;
  errors: any;
  photos: IUploadedPhoto[];
  onUploadPhotos: (photos: IImage[]) => void;
  onFinishLoadPhotos: (photos: IUploadedPhoto[]) => void;
  setLoadingPhotos: (state: boolean) => void;
  vehicleInfo?: IVehicle;
  isEdit?: boolean;
}

const AddVehicleView: FC<IAddVehicles> = ({
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
}) => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background style={styles.block}>
      <Controller
        control={control}
        defaultValue={isEdit ? vehicleInfo?.brand : ''}
        name="brand"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            additionalStyles={styles.inputBlock}
            error={errors?.brand}
            errorText={errors?.brand?.message}
            label="Brand"
            mode="outlined"
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
            additionalStyles={styles.inputBlock}
            error={errors?.model}
            errorText={errors?.model?.message}
            label="Model"
            mode="outlined"
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
            additionalStyles={styles.inputBlock}
            error={errors?.year}
            errorText={errors?.year?.message}
            keyboardType="number-pad"
            label="Year"
            mode="outlined"
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
            additionalStyles={styles.inputBlock}
            error={errors?.mileage}
            errorText={errors?.mileage?.message}
            keyboardType="number-pad"
            label="Mileage"
            mode="outlined"
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
            additionalStyles={styles.inputBlock}
            error={errors?.price}
            errorText={errors?.price?.message}
            keyboardType="number-pad"
            label="Price"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <MultiPicker
        defaultPhotos={vehicleInfo?.photos}
        text={`Upload your vehicle photos. Max ${photos?.length}/15`}
        onFinishLoadPhotos={onFinishLoadPhotos}
        onUploadPhotos={onUploadPhotos}
      />
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
