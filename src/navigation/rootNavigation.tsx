import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStackScreens from './authStack/authStack';
import MainStackScreens from './mainStack/mainStack';

function RootNavigation(): JSX.Element {
  const RootStack = createNativeStackNavigator();
  
  return (
      <RootStack.Navigator screenOptions={{
        headerShown: false
      }}>
        <RootStack.Screen name='Auth' component={AuthStackScreens}/>
        <RootStack.Screen name='Main' component={MainStackScreens}/>
      </RootStack.Navigator>
    )
  };

  export default RootNavigation