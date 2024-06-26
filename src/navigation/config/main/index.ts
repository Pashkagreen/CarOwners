import MyGarageStackScreens from '../../roots/my-garage';
import screens from '@screens/index.ts';

export default {
  MyGarage: {
    title: '',
    headerShown: false,
    screenName: 'MyPark',
    component: MyGarageStackScreens,
    icon: 'home',
    size: 24,
  },
  History: {
    title: '',
    headerShown: false,
    screenName: 'History',
    component: screens.History,
    icon: 'history',
    size: 24,
  },
  Profile: {
    title: 'Your profile',
    headerShown: true,
    screenName: 'Profile',
    component: screens.Profile,
    icon: 'account-circle',
    size: 24,
  },
};
