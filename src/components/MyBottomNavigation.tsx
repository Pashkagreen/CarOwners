import * as React from 'react';

import {CommonActions, ParamListBase} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {BottomNavigation} from 'react-native-paper';

interface MyBottomInterface {
  [key: string]: any;
}

interface onTabPressInterface {
  route: RouteProp<ParamListBase>;
  preventDefault: () => void;
}

const MyBottomNavigation = ({
  navigation,
  state,
  descriptors,
  insets,
}: MyBottomInterface) => (
  <BottomNavigation.Bar
    getLabelText={({route}): string => {
      const {options} = descriptors[route.key];

      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : undefined;

      return String(label);
    }}
    navigationState={state}
    renderIcon={({route, focused, color}) => {
      const {options} = descriptors[route.key];
      if (options.tabBarIcon) {
        return options.tabBarIcon({focused, color, size: 24});
      }

      return null;
    }}
    safeAreaInsets={insets}
    onTabPress={({route, preventDefault}: onTabPressInterface) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (event.defaultPrevented) {
        preventDefault();
      } else {
        navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key,
        });
      }
    }}
  />
);

export default MyBottomNavigation;
