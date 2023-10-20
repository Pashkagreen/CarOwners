import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store';
import AuthStackScreens, { AuthStackParams } from './AuthStack';
import MainStackScreens, { MainStackParams } from './MainStack';

export type TRootStackNavigation = {
  Auth: AuthStackParams;
  Main: NavigatorScreenParams<MainStackParams>;
};

const RootNavigation = () => {
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

export default observer(RootNavigation);
