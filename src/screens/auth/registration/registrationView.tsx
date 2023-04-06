import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Background, Logo, Header, Button, TextInput, BackButton } from '../../../components/index';
import { theme } from '../../../core/theme';
import { Navigation } from '../../../types';

type validateObject = {
  value: string;
  error: string;
}
interface IRegistrationProps {
  navigation: Navigation,
  phoneNumber: validateObject,
  code: validateObject,
  username: validateObject,
  setUsername: React.Dispatch<React.SetStateAction<validateObject>>,
  setPhoneNumber: React.Dispatch<React.SetStateAction<validateObject>>,
  setCode: React.Dispatch<React.SetStateAction<validateObject>>,
  onSignUpPressed: () => void
};

function RegistrationView ({ navigation, username, phoneNumber, code, setPhoneNumber, setCode, setUsername, onSignUpPressed }: IRegistrationProps): JSX.Element {

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Onboarding')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
      />

    <TextInput
      label="Phone number"
      keyboardType="phone-pad"
      returnKeyType="next"
      value={phoneNumber.value}
      onChangeText={text => setPhoneNumber({ value: text, error: '' })}
      error={!!phoneNumber.error}
      errorText={phoneNumber.error}
      autoCapitalize="none"
      autoComplete="email"
      textContentType="emailAddress"
    />

    <TextInput
      label="Code"
      returnKeyType="done"
      value={code.value}
      onChangeText={text => setCode({ value: text, error: '' })}
      error={!!code.error}
      errorText={code.error}
      secureTextEntry
    />

      <Button mode="contained" onPress={onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegistrationView);