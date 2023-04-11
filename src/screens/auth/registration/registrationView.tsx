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
interface IRegistrationProps {
  navigation: Navigation;
  phoneNumber: validateObject;
  code: validateObject;
  username: validateObject;
  loading: boolean;
  otpLoading: boolean;
  isSignUpAvailable: boolean;
  sendOTPCode: () => void;
  setUsername: React.Dispatch<React.SetStateAction<validateObject>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<validateObject>>;
  setCode: React.Dispatch<React.SetStateAction<validateObject>>;
  onSignUpPressed: () => void;
  //PhoneInputProps
  inputRef: React.Ref<PhoneInputComponent>;
  errorText?: string;
  initialCountry: string;
  onSelectCountry: (iso2: string) => void;
  onChangePhoneNumber: (phone: string) => void;
}

const RegistrationView = ({
  navigation,
  username,
  phoneNumber,
  code,
  initialCountry,
  inputRef,
  loading,
  otpLoading,
  isSignUpAvailable,
  sendOTPCode,
  onSelectCountry,
  onChangePhoneNumber,
  setCode,
  setUsername,
  onSignUpPressed,
}: IRegistrationProps): JSX.Element => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <BackButton goBack={() => navigation.navigate('Onboarding')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        error={!!username.error}
        errorText={username.error}
        label="Name"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({value: text, error: ''})}
      />

      <PhoneInput
        errorText={phoneNumber.error}
        initialCountry={initialCountry || undefined}
        inputRef={inputRef}
        value={phoneNumber.value}
        onChange={onChangePhoneNumber}
        onSelectCountry={onSelectCountry}
      />

      {isSignUpAvailable && (
        <TextInput
          secureTextEntry
          error={!!code.error}
          errorText={code.error}
          label="Code"
          returnKeyType="done"
          value={code.value}
          onChangeText={text => setCode({value: text, error: ''})}
        />
      )}

      <Button
        loading={isSignUpAvailable ? loading : otpLoading}
        mode="contained"
        style={styles.button}
        onPress={isSignUpAvailable ? onSignUpPressed : sendOTPCode}>
        {isSignUpAvailable ? 'Sign Up' : 'Send OTP'}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  </KeyboardAwareScrollView>
);

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
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default memo(RegistrationView);
