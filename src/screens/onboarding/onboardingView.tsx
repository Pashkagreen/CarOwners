import React, {memo} from 'react';
import {
  Background,
  Logo,
  Header,
  Button,
  Paragraph,
} from '../../components/index';
import {Navigation} from '../../types';

type Props = {
  navigation: Navigation;
};

const Onboarding = ({navigation}: Props): JSX.Element => (
  <Background>
    <Logo />
    <Header>Car Owners</Header>

    <Paragraph>
      The easiest way to collect information about your cars.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('Registration')}>
      Sign Up
    </Button>
  </Background>
);

export default memo(Onboarding);
