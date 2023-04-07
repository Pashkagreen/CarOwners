import * as React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {MyGarage, AddVehicle} from '../../screens/index';

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
    <MyGarageStack.Screen name="MyGarage" component={MyGarage} />
    <MyGarageStack.Screen name="AddVehicle" component={AddVehicle} />
  </MyGarageStack.Navigator>
);

export default MyGarageStackScreens;
