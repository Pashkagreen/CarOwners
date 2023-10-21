import React, { FC } from 'react';

import {
  Background,
  Button,
  Logo,
  Paragraph,
  Title,
} from '../../../components/index';

import { AuthStackParams } from '../../../navigation/roots/auth';

interface IOnboarding {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
}

const Onboarding: FC<IOnboarding> = ({ navigateTo }) => (
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
