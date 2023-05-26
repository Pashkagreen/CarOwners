import * as React from 'react';
import { Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackButton, Header } from '../../components';

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
          headerTitleAlign: 'center',
          headerLeft: garageScreen.headerLeft
            ? Platform.OS === 'ios'
              ? () => <BackButton goBack={() => navigation.goBack()} />
              : undefined
            : undefined,
          headerTitle: garageScreen.headerShown
            ? () => <Header text={garageScreen.title} />
            : undefined,
        })}
      />
    ))}
  </MyGarageStack.Navigator>
);

export default MyGarageStackScreens;
