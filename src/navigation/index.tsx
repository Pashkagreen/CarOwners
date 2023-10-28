import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from '@stores';
import { observer } from 'mobx-react-lite';

import AuthStackScreens, { AuthStackParams } from './roots/auth';
import MainStackScreens, { MainStackParams } from './roots/main';

export type TRootStackNavigation = {
  Auth: AuthStackParams;
  Main: NavigatorScreenParams<MainStackParams>;
};

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<TRootStackNavigation>();
  const {
    userStore: {
      user: { isAuthorized = false },
    },
  } = useStore();

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
};

export default observer(RootNavigator);
