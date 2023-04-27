import { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { getUserCurrentCountry } from '../../core/utils';

import { useStore } from '../../store';
import { Navigation } from '../../types';
import OnboardingView from './OnboardingView';

type Props = {
  navigation: Navigation;
};

const OnboardingContainer = ({ navigation }: Props): JSX.Element => {
  const { userStore } = useStore();

  const getUserCountry = async () => {
    const country = await getUserCurrentCountry();
    if (country) {
      userStore.updateUserCountry(country);
    }
  };

  useEffect(() => {
    getUserCountry();
  }, []);

  return <OnboardingView navigation={navigation} />;
};

export default observer(OnboardingContainer);
