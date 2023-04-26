import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import screens from '../../screens';

export type AuthStackParams = {
  Login: undefined;
  Registration: undefined;
  Onboarding: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreens = (): JSX.Element => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen component={screens.Onboarding} name="Onboarding" />
    <AuthStack.Screen component={screens.Login} name="Login" />
    <AuthStack.Screen component={screens.Registration} name="Registration" />
  </AuthStack.Navigator>
);

export default AuthStackScreens;
