import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInputComponent from 'react-native-phone-input';

import {
  BackButton,
  Background,
  Button,
  Logo,
  PhoneInput,
  TextInput,
  Title,
} from '../../../components/index';

import { AuthStackParams } from '../../../navigation/AuthStack';
import { validateObject } from '../../../types';
import styles from './style';

interface LoginProps {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
  onChange: (cb: any) => (text: string) => void;
  goBack: () => void;
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
  navigateTo,
  goBack,
  onChange,
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
      <BackButton goBack={goBack} />
      <Logo />
      <Title>Welcome back.</Title>

      <PhoneInput
        errorText={phoneNumber.error}
        initialCountry={initialCountry}
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
          onChangeText={onChange(setCode)}
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
        <TouchableOpacity onPress={navigateTo('Registration')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  </KeyboardAwareScrollView>
);

export default LoginView;
