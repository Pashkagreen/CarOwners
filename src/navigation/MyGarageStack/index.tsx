import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackButton } from '../../components';

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
  <MyGarageStack.Navigator>
    {Object.values(myGarageStackConfig).map(garageScreen => (
      <MyGarageStack.Screen
        key={garageScreen.screenName}
        component={garageScreen.component as any}
        name={garageScreen.screenName as any}
        options={({ navigation }) => ({
          headerShown: garageScreen.headerShown,
          headerLeft: garageScreen.headerLeft
            ? () => <BackButton goBack={() => navigation.goBack()} />
            : undefined,
          title: garageScreen.title,
        })}
      />
    ))}
  </MyGarageStack.Navigator>
);

export default MyGarageStackScreens;
