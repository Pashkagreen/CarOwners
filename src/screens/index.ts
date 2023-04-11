import Login from './auth/login/loginContainer';
import Registration from './auth/registration/registrationContainer';
import AddVehicle from './main/addVehicle/addVehicleContainer';
import History from './main/history/historyContainer';
import MyVehicles from './main/myVehicles/myVehiclesContainer';
import Profile from './main/profile/profileContainer';
import Onboarding from './onboarding/onboardingContainer';

const screens = {
  Login,
  Registration,
  History,
  Profile,
  MyVehicles,
  AddVehicle,
  Onboarding,
};

export default screens;
