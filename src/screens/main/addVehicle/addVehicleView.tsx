import {StyleSheet, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {BackButton, Background, Button} from '../../../components';

import {hitSlop, theme} from '../../../core/theme';
import {fetchState} from '../../../store/VehiclesStore';

interface AddVehiclesInterface {
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
  price?: string;
  loading: fetchState;
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
}: AddVehiclesInterface): JSX.Element => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
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
          keyboardType="numeric"
          label="Price"
          mode="outlined"
          style={styles.inputBlock}
          value={price}
          onChangeText={setPrice}
        />
        <View />
        <Button
          hitSlop={hitSlop}
          loading={loading === 'pending' ? true : false}
          mode="contained"
          style={styles.btn}
          onPress={isEdit ? updateVehicle : createVehicle}>
          {isEdit ? 'Update vehicle info' : 'Create a vehicle'}
        </Button>
      </Background>
    </KeyboardAwareScrollView>
  );
};

export default AddVehicleView;

const getStyles = (insets: any) =>
  StyleSheet.create({
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
      marginTop: 16,
      width: '100%',
    },
    background: {
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop: insets.top + 8,
    },
    btn: {
      marginTop: 24,
    },
  });
