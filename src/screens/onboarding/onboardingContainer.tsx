import {useEffect} from 'react';
import {Navigation} from '../../types';
import OnboardingView from './onboardingView';
import {getUserCurrentCountry} from '../../core/utils';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../store';

type Props = {
  navigation: Navigation;
};

function OnboardingContainer({navigation}: Props): JSX.Element {
  const {user} = useStore();

  const getUserCountry = async () => {
    const country = await getUserCurrentCountry();
    if (country) {
      user.updateUserCountry(country);
    }
  };

  useEffect(() => {
    getUserCountry();
  }, []);

  return <OnboardingView navigation={navigation} />;
}

export default observer(OnboardingContainer);
