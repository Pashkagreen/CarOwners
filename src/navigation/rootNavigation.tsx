import * as React from 'react';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store';
import AuthStackScreens, { AuthStackParams } from './AuthStack';
import MainStackScreens, { MainStackParams } from './MainStack';

export type RootStackNavigationProp = {
  Auth: AuthStackParams;
  Main: NavigatorScreenParams<MainStackParams>;
};

function RootNavigation(): JSX.Element {
  const RootStack = createNativeStackNavigator<RootStackNavigationProp>();
  const { userStore } = useStore();
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
