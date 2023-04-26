import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store';
import AuthStackScreens from './authStack/authStack';
import MainStackScreens from './mainStack/mainStack';

type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

function RootNavigation(): JSX.Element {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
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
