import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import myGarageStackConfig from '../config/myGarageStackConfig';

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
    {Object.values(myGarageStackConfig).map(garageScreen => (
      <MyGarageStack.Screen
        key={garageScreen.screenName}
        component={garageScreen.component as any}
        name={garageScreen.screenName as any}
      />
    ))}
  </MyGarageStack.Navigator>
);

export default MyGarageStackScreens;
