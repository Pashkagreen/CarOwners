import { FC, useEffect } from 'react';

import { AuthStackParams } from '@navigation/roots/auth';
import { StackScreenProps } from '@react-navigation/stack';
import { useStore } from '@stores';
import { getUserCurrentCountry } from '@utils';
import { observer } from 'mobx-react-lite';

import OnboardingView from './view';

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
