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

import { validateObject } from '../../../types';
import styles from './style';

interface LoginProps {
  navigateToRegistration: () => void;
  navigateToOnboarding: () => void;
  phoneNumber: validateObject;
  code: validateObject;
  loading: boolean;
  otpLoading: boolean;
  isLoginAvailable: boolean;
  setPhoneNumber: React.Dispatch<React.SetStateAction<validateObject>>;
  setCode: React.Dispatch<React.SetStateAction<validateObject>>;
  login: () => void;
  sendOTPCode: () => void;
  //PhoneInputProps
  inputRef: React.Ref<PhoneInputComponent>;
  errorText?: string;
  initialCountry: string;
  onSelectCountry: (iso2: string) => void;
  onChangePhoneNumber: (phone: string) => void;
}

const LoginView = ({
  navigateToRegistration,
  navigateToOnboarding,
  phoneNumber,
  code,
  initialCountry,
  inputRef,
  loading,
  otpLoading,
  isLoginAvailable,
  onSelectCountry,
  onChangePhoneNumber,
  setCode,
  login,
  sendOTPCode,
}: LoginProps): JSX.Element => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <BackButton goBack={navigateToOnboarding} />
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

      {isLoginAvailable && (
        <TextInput
          secureTextEntry
          error={!!code.error}
          errorText={code.error}
          label="Code"
          returnKeyType="done"
          value={code.value}
          onChangeText={text => setCode(prev => ({ ...prev, value: text }))}
        />
      )}

      <Button
        loading={isLoginAvailable ? loading : otpLoading}
        mode="contained"
        onPress={isLoginAvailable ? login : sendOTPCode}>
        {isLoginAvailable ? 'Login' : 'Send OTP'}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={navigateToRegistration}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  </KeyboardAwareScrollView>
);

export default LoginView;
