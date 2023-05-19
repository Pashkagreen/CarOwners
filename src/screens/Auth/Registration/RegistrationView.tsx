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

import { AuthStackParams } from '../../../navigation/AuthStack';
import { validateObject } from '../../../types';
import styles from './style';

interface RegistrationProps {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
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
  onChange: (cb: any) => (text: string) => void;
  onSignUpPressed: () => void;
  //PhoneInputProps
  inputRef: React.Ref<PhoneInputComponent>;
  errorText?: string;
  initialCountry: string;
  onSelectCountry: (iso2: string) => void;
  onChangePhoneNumber: (phone: string) => void;
}

const RegistrationView = ({
  onChange,
  navigateTo,
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
      <BackButton goBack={navigateTo('Onboarding')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        error={!!username.error}
        errorText={username.error}
        label="Name"
        returnKeyType="next"
        value={username.value}
        onChangeText={onChange(setUsername)}
      />

      <PhoneInput
        errorText={phoneNumber.error}
        initialCountry={initialCountry}
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
          onChangeText={onChange(setCode)}
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
        <TouchableOpacity onPress={navigateTo('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  </KeyboardAwareScrollView>
);

export default RegistrationView;
