import {memo} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {Text, TextInput} from 'react-native-paper';

import {BackButton, Background, Button} from '../../../components';

import {hitSlop, theme} from '../../../core/theme';

interface AddVehiclesInterface {
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
  price?: string;
  loading: boolean | undefined;
  isEdit: boolean | undefined;
  createVehicle: () => void;
  updateVehicle: () => void;
  setBrand: (text: string) => void;
  setModel: (text: string) => void;
  setYear: (text: string) => void;
  setMileage: (text: string) => void;
  setPrice: (text: string) => void;
  goBack: () => void;
}

const AddVehicleView = ({
  brand,
  model,
  year,
  mileage,
  price,
  loading,
  isEdit,
  createVehicle,
  updateVehicle,
  setBrand,
  setModel,
  setYear,
  setMileage,
  setPrice,
  goBack,
}: AddVehiclesInterface): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <Background style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText} variant="headlineMedium">
          {isEdit ? 'Update vehicle' : 'Add Vehicle'}
        </Text>
        <BackButton goBack={goBack} />
      </View>
      <TextInput
        label="Brand"
        mode="outlined"
        style={styles.inputBlock}
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        label="Model"
        mode="outlined"
        style={styles.inputBlock}
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        label="Year"
        mode="outlined"
        style={styles.inputBlock}
        value={year}
        onChangeText={setYear}
      />
      <TextInput
        keyboardType="number-pad"
        label="Mileage"
        mode="outlined"
        style={styles.inputBlock}
        value={mileage}
        onChangeText={setMileage}
      />
      <TextInput
        keyboardType="number-pad"
        label="Price"
        mode="outlined"
        style={styles.inputBlock}
        value={price}
        onChangeText={setPrice}
      />
      <View />
      <Button
        hitSlop={hitSlop}
        loading={loading}
        mode="contained"
        onPress={isEdit ? updateVehicle : createVehicle}>
        {isEdit ? 'Update vehicle info' : 'Create a vehicle'}
      </Button>
    </Background>
  </SafeAreaView>
);

export default memo(AddVehicleView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginLeft: -16,
    width: '100%',
  },
  headerText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    marginLeft: 14,
  },
  inputBlock: {
    width: '100%',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
