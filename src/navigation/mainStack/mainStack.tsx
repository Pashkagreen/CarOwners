import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {History, Profile} from '../../screens/index';
import MyGarageStackScreens from '../mainStack/myGarageStack';

export type MainStackParams = {
  MyGarageStack: undefined;
  History: undefined;
  Profile: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParams>;

const BottomTab = createBottomTabNavigator<MainStackParams>();

const MainStackScreens = (): JSX.Element => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <BottomTab.Screen component={MyGarageStackScreens} name="MyGarageStack" />
    <BottomTab.Screen component={History} name="History" />
    <BottomTab.Screen component={Profile} name="Profile" />
  </BottomTab.Navigator>
);

export default MainStackScreens;
