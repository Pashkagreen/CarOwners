import MyGarageStackScreens from '../navigation/mainStack/myGarageStack';
import screens from '../screens';

export default {
  MyGarage: {
    screenName: 'MyPark',
    component: MyGarageStackScreens,
    icon: 'home',
    size: 24,
  },
  History: {
    screenName: 'History',
    component: screens.History,
    icon: 'history',
    size: 24,
  },
  Profile: {
    screenName: 'Profile',
    component: screens.Profile,
    icon: 'account-circle',
    size: 24,
  },
};
