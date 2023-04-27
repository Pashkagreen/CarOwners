import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInputComponent from 'react-native-phone-input';

import {
  BackButton,
  Background,
  Button,
  Header,
  Logo,
  PhoneInput,
  TextInput,
} from '../../../components/index';

import styles from './style';

type validateObject = {
  value: string;
  error: string;
};
type RegistrationProps = {
  navigateToLogin: () => void;
  navigateToOnboarding: () => void;
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
};

const RegistrationView = ({
  navigateToOnboarding,
  navigateToLogin,
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
}: RegistrationProps): JSX.Element => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <BackButton goBack={navigateToOnboarding} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        error={!!username.error}
        errorText={username.error}
        label="Name"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setUsername({ value: text, error: '' })}
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
          onChangeText={text => setCode({ value: text, error: '' })}
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
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  </KeyboardAwareScrollView>
);

export default RegistrationView;
