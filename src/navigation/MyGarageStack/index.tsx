import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import screens from '../../screens';
import { VehicleInterface } from '../../store/Vehicles/types';

export type MyGarageStackParams = {
  MyVehicles: undefined;
  AddVehicle: {
    isEdit?: boolean;
    vehicleInfo?: VehicleInterface;
  };
};

const MyGarageStack = createNativeStackNavigator<MyGarageStackParams>();

const MyGarageStackScreens = (): JSX.Element => (
  <MyGarageStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MyGarageStack.Screen component={screens.MyVehicles} name="MyVehicles" />
    <MyGarageStack.Screen component={screens.AddVehicle} name="AddVehicle" />
  </MyGarageStack.Navigator>
);

export default MyGarageStackScreens;
