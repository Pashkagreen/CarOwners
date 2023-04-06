import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Background, Logo, Header, Button, TextInput, BackButton } from '../../../components/index';
import { theme } from '../../../core/theme';
import { Navigation } from '../../../types';

type validateObject = {
  value: string;
  error: string;
}
interface ILoginProps {
  navigation: Navigation,
  phoneNumber: validateObject,
  code: validateObject,
  setPhoneNumber: React.Dispatch<React.SetStateAction<validateObject>>,
  setCode: React.Dispatch<React.SetStateAction<validateObject>>,
  onLoginPressed: () => void
};

function LoginView({ navigation, phoneNumber, code, setPhoneNumber, setCode, onLoginPressed }: ILoginProps): JSX.Element {
  return (
    <Background>
    <BackButton goBack={() => navigation.navigate('Onboarding')} />
    <Logo />
    <Header>Welcome back.</Header>
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

    <View style={styles.forgotPassword}>
        <Text style={styles.label}>Forgot your password?</Text>
    </View>

    <Button mode="contained" onPress={onLoginPressed}>
      Login
    </Button>

    <View style={styles.row}>
      <Text style={styles.label}>Don’t have an account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </Background>
 );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default memo(LoginView);