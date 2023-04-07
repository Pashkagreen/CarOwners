import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Login, Onboarding, Registration} from '../../screens/index';

export type AuthStackParams = {
  Login: undefined;
  Registration: undefined;
  Onboarding: undefined;
};

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParams>;

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreens = (): JSX.Element => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen component={Onboarding} name="Onboarding" />
    <AuthStack.Screen component={Login} name="Login" />
    <AuthStack.Screen component={Registration} name="Registration" />
  </AuthStack.Navigator>
);

export default AuthStackScreens;
