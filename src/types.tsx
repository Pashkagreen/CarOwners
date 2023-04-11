import {
  CommonNavigationAction,
  StackActionType,
} from '@react-navigation/native';

export type Navigation = {
  navigate: (scene: string, params?: object) => void;
  replace: (stack: string) => void;
  getState: () => void;
  dispatch: (action: CommonNavigationAction | StackActionType) => void;
};
