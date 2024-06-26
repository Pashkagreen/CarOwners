import * as React from 'react';

import { Header, TabBarIcon } from '@components/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import bottomBarConfig from '../../config/main';

import { MyGarageStackParams } from '../my-garage';

export type MainStackParams = {
  MyGarage: MyGarageStackParams;
  History: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<MainStackParams>();

const MainStackScreens = () => (
  <BottomTab.Navigator>
    {Object.values(bottomBarConfig).map(bottomBar => (
      <BottomTab.Screen
        key={bottomBar.screenName}
        component={bottomBar.component}
        name={bottomBar.screenName as any}
        options={{
          tabBarLabel: bottomBar.screenName,
          tabBarIcon: props => <TabBarIcon name={bottomBar.icon} {...props} />,
          tabBarLabelStyle: { marginBottom: 8 },
          headerTitleAlign: 'center',
          headerShown: bottomBar.headerShown,
          headerTitle: bottomBar.headerShown
            ? () => <Header text={bottomBar.title} />
            : undefined,
        }}
      />
    ))}
  </BottomTab.Navigator>
);

export default MainStackScreens;
