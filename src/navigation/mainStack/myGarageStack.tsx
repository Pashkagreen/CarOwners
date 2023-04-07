import * as React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {AddVehicle, MyGarage} from '../../screens/index';

export type MyGarageStackParams = {
  MyGarage: undefined;
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
    <MyGarageStack.Screen component={MyGarage} name="MyGarage" />
    <MyGarageStack.Screen component={AddVehicle} name="AddVehicle" />
  </MyGarageStack.Navigator>
);

export default MyGarageStackScreens;
