import {memo} from 'react';
import {SafeAreaView, Text} from 'react-native';

const AddVehicleView = (): JSX.Element => {
  return (
    <>
      <SafeAreaView>
        <Text>Add Vehicle</Text>
      </SafeAreaView>
    </>
  );
};

export default memo(AddVehicleView);
