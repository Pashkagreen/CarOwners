import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import {VehicleInfoInterface} from '../services/vehicles';

import {useStore} from '../store';
import AuthStackScreens, {AuthStackNavigationProp} from './authStack/authStack';
import MainStackScreens, {MainStackNavigationProp} from './mainStack/mainStack';

export type RootStackNavigationProp =
  | AuthStackNavigationProp
  | MainStackNavigationProp;

export type ParamList = {
  AddVehicle: {
    isEdit: boolean | undefined;
    vehicleInfo: VehicleInfoInterface | undefined;
  };
  MyVehicles: {
    afterChange: boolean | undefined;
  };
};

function RootNavigation(): JSX.Element {
  const RootStack = createNativeStackNavigator();
  const {userStore} = useStore();
  let isAuthorized = userStore.user.isAuthorized;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthorized ? (
        <RootStack.Screen component={MainStackScreens} name="Main" />
      ) : (
        <RootStack.Screen component={AuthStackScreens} name="Auth" />
      )}
    </RootStack.Navigator>
  );
}

export default observer(RootNavigation);
