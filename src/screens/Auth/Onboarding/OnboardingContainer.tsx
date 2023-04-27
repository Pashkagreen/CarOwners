import { useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { getUserCurrentCountry } from '../../../core/utils';

import { AuthStackParams } from '../../../navigation/AuthStack';
import { useStore } from '../../../store';
import OnboardingView from './OnboardingView';

export type Props = StackScreenProps<AuthStackParams, 'Onboarding'>;

const OnboardingContainer = ({ navigation }: Props): JSX.Element => {
  const { userStore } = useStore();

  const getUserCountry = async () => {
    const country = await getUserCurrentCountry();
    if (country) {
      userStore.updateUserCountry(country);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration');
  };

  useEffect(() => {
    getUserCountry();
  }, []);

  return (
    <OnboardingView
      navigateToLogin={navigateToLogin}
      navigateToRegistration={navigateToRegistration}
    />
  );
};

export default observer(OnboardingContainer);
