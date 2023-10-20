import { FC, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { getUserCurrentCountry } from '../../../core/utils';

import { AuthStackParams } from '../../../navigation/AuthStack';
import { useStore } from '../../../store';
import OnboardingView from './OnboardingView';

export type TProps = StackScreenProps<AuthStackParams, 'Onboarding'>;

const OnboardingContainer: FC<TProps> = ({ navigation }) => {
  const {
    userStore: { setUserCountry },
  } = useStore();

  const getUserCountry = async () => {
    const country = await getUserCurrentCountry();

    if (country) {
      setUserCountry(country);
    }
  };

  const navigateTo = (screenName: keyof AuthStackParams) => () => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    void getUserCountry();
  }, []);

  return <OnboardingView navigateTo={navigateTo} />;
};

export default observer(OnboardingContainer);
