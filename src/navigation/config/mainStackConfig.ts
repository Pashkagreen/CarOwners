import screens from '../../screens';
import MyGarageStackScreens from '../MyGarageStack';

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
