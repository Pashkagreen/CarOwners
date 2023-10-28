import screens from '@screens/index.ts';

export default {
  MyVehicles: {
    title: '',
    headerShown: false,
    headerLeft: false,
    screenName: 'MyVehicles',
    component: screens.MyVehicles,
  },
  AddVehicle: {
    title: 'Info',
    headerShown: true,
    headerLeft: true,
    screenName: 'AddVehicle',
    component: screens.AddVehicle,
  },
};
