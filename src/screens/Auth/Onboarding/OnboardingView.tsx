import React from 'react';

import {
  Background,
  Button,
  Logo,
  Paragraph,
  Title,
} from '../../../components/index';

import { AuthStackParams } from '../../../navigation/AuthStack';

interface OnboardingProps {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
}

const Onboarding = ({ navigateTo }: OnboardingProps): JSX.Element => (
  <Background>
    <Logo />
    <Title>Car Owners</Title>

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
