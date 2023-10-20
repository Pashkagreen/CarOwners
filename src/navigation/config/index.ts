import { createNavigationContainerRef } from '@react-navigation/native';

import { TRootStackNavigation } from '..';

export const navigationRef =
  createNavigationContainerRef<TRootStackNavigation>();

export function navigate<RouteName extends keyof TRootStackNavigation>(
  ...args: RouteName extends unknown
    ? undefined extends TRootStackNavigation[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: TRootStackNavigation[RouteName]]
      : [screen: RouteName, params: TRootStackNavigation[RouteName]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}
