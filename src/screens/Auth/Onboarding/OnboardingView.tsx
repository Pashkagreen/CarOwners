import React from 'react';

import {
  Background,
  Button,
  Header,
  Logo,
  Paragraph,
} from '../../../components/index';

import { AuthStackParams } from '../../../navigation/AuthStack';

interface OnboardingProps {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
}

const Onboarding = ({ navigateTo }: OnboardingProps): JSX.Element => (
  <Background>
    <Logo />
    <Header>Car Owners</Header>

    <Paragraph>
      The easiest way to collect information about your cars.
    </Paragraph>
    <Button mode="contained" onPress={navigateTo('Login')}>
      Login
    </Button>
    <Button mode="outlined" onPress={navigateTo('Registration')}>
      Sign Up
    </Button>
  </Background>
);

export default Onboarding;
