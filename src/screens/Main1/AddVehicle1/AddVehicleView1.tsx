import { View } from 'react-native';

import { Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from 'react-native-paper';

import {
  BackButton,
  Background,
  Button,
  TextInput,
} from '../../../components/index';

import { hitSlop } from '../../../core/theme';
import { fetchState } from '../../../store/VehiclesStore';
import { FormData } from './AddVehicleContainer1';
import styles from './style';

interface AddVehiclesInterface {
  control: any;
  onSubmit: (data: FormData) => void;
  handleSubmit: any;
  loading: fetchState;
  isEdit: boolean | undefined;
  goBack: () => void;
  vehicleInfo: any;
  errors: any;
}

const AddVehicleView = ({
  control,
  onSubmit,
  handleSubmit,
  vehicleInfo,
  loading,
  isEdit,
  goBack,
  errors,
}: AddVehiclesInterface): JSX.Element => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText} variant="headlineMedium">
          {isEdit ? 'Update vehicle' : 'Add Vehicle'}
        </Text>
        <BackButton goBack={goBack} />
      </View>
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
      <View />
      <Button
        hitSlop={hitSlop}
        loading={loading === 'pending' ? true : false}
        mode="contained"
        style={styles.btn}
        onPress={handleSubmit(onSubmit)}>
        {isEdit ? 'Update vehicle info' : 'Create a vehicle'}
      </Button>
    </Background>
  </KeyboardAwareScrollView>
);

export default AddVehicleView;
