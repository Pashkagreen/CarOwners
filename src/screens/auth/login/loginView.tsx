import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInputComponent from 'react-native-phone-input';

import {
  BackButton,
  Background,
  Button,
  Header,
  Logo,
  TextInput,
} from '../../../components/index';
import PhoneInput from '../../../components/PhoneInput';

import {theme} from '../../../core/theme';
import {Navigation} from '../../../types';

type validateObject = {
  value: string;
  error: string;
};
interface ILoginProps {
  navigation: Navigation;
  phoneNumber: validateObject;
  code: validateObject;
  setPhoneNumber: React.Dispatch<React.SetStateAction<validateObject>>;
  setCode: React.Dispatch<React.SetStateAction<validateObject>>;
  onLoginPressed: () => void;
  //PhoneInputProps
  inputRef: React.Ref<PhoneInputComponent>;
  errorText?: string;
  initialCountry: string;
  onSelectCountry: (iso2: string) => void;
  onChangePhoneNumber: (phone: string) => void;
}

const LoginView = ({
  navigation,
  phoneNumber,
  code,
  initialCountry,
  inputRef,
  onSelectCountry,
  onChangePhoneNumber,
  setCode,
  onLoginPressed,
}: ILoginProps): JSX.Element => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <BackButton goBack={() => navigation.navigate('Onboarding')} />
      <Logo />
      <Header>Welcome back.</Header>

      <PhoneInput
        errorText={phoneNumber.error}
        initialCountry={initialCountry || undefined}
        inputRef={inputRef}
        value={phoneNumber.value}
        onChange={onChangePhoneNumber}
        onSelectCountry={onSelectCountry}
      />

      <TextInput
        secureTextEntry
        error={!!code.error}
        errorText={code.error}
        label="Code"
        returnKeyType="done"
        value={code.value}
        onChangeText={text => setCode({value: text, error: ''})}
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
  </KeyboardAwareScrollView>
);

const styles = StyleSheet.create({
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 24,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default memo(LoginView);
