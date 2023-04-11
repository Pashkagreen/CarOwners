import * as React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import screens from '../../screens';

export type MyGarageStackParams = {
  MyVehicles: undefined;
  AddVehicle: undefined;
};

export type MyGarageStackNavigationProp =
  NativeStackNavigationProp<MyGarageStackParams>;

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
