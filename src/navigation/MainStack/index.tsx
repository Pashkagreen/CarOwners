import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MyBottomNavigation, TabBarIcon } from '../../components';

import bottomBarConfig from '../config/mainStackConfig';

import { MyGarageStackParams } from '../MyGarageStack';

export type MainStackParams = {
  MyGarage: MyGarageStackParams;
  History: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<MainStackParams>();

const MainStackScreens = (): JSX.Element => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={props => <MyBottomNavigation {...props} />}>
    {Object.values(bottomBarConfig).map(bottomBar => (
      <BottomTab.Screen
        key={bottomBar.screenName}
        component={bottomBar.component}
        name={bottomBar.screenName as any}
        options={{
          tabBarLabel: bottomBar.screenName,
          tabBarIcon: props => <TabBarIcon name={bottomBar.icon} {...props} />,
        }}
      />
    ))}
  </BottomTab.Navigator>
);

export default MainStackScreens;
