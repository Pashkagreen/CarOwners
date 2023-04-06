import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Registration, } from '../../screens/index';

type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackScreens = (): JSX.Element => (
  <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Registration} />
  </AuthStack.Navigator>
);

export default AuthStackScreens