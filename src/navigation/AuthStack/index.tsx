import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackButton } from '../../components';

import authStackConfig from '../config/authStackConfig';

export type AuthStackParams = {
  Login: undefined;
  Registration: undefined;
  Onboarding: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreens = (): JSX.Element => (
  <AuthStack.Navigator>
    {Object.values(authStackConfig).map(authScreen => (
      <AuthStack.Screen
        key={authScreen.screenName}
        component={authScreen.component as any}
        name={authScreen.screenName as any}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerLeft: authScreen.headerLeft
            ? () => <BackButton goBack={() => navigation.goBack()} />
            : undefined,
          title: authScreen.title,
        })}
      />
    ))}
  </AuthStack.Navigator>
);

export default AuthStackScreens;
