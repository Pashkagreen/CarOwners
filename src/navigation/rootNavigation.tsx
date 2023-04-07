import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStackScreens, {AuthStackNavigationProp} from './authStack/authStack';
import MainStackScreens, {MainStackNavigationProp} from './mainStack/mainStack';

export type RootStackNavigationProp =
  | AuthStackNavigationProp
  | MainStackNavigationProp;

function RootNavigation(): JSX.Element {
  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen component={AuthStackScreens} name="Auth" />
      <RootStack.Screen component={MainStackScreens} name="Main" />
    </RootStack.Navigator>
  );
}

export default RootNavigation;
