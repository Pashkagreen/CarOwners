import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  Background,
  Button,
  Logo,
  PhoneInput,
  TextInput,
  Title,
} from '@components/index';
import { AuthStackParams } from '@navigation/roots/auth';
import { IValidateObject } from '@types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInputComponent from 'react-native-phone-input';

import styles from './styles';

interface ILogin {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
  onChange: (cb: any) => (text: string) => void;
  phoneNumber: IValidateObject;
  code: IValidateObject;
  loading: boolean;
  otpLoading: boolean;
  isLoginAvailable: boolean;
  setPhoneNumber: React.Dispatch<React.SetStateAction<IValidateObject>>;
  setCode: React.Dispatch<React.SetStateAction<IValidateObject>>;
  login: () => void;
  sendOTPCode: () => void;
  inputRef: React.Ref<PhoneInputComponent>;
  initialCountry: string;
  onSelectCountry: (iso2: string) => void;
  onChangePhoneNumber: (phone: string) => void;
  errorText?: string;
}

const LoginView: FC<ILogin> = ({
  navigateTo,
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
}) => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
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
          additionalStyles={styles.button}
          error={!!code.error}
          errorText={code.error}
          keyboardType="phone-pad"
          label="Code"
          returnKeyType="done"
          value={code.value}
          onChangeText={onChange(setCode)}
        />
      )}
      <Button
        loading={isLoginAvailable ? loading : otpLoading}
        mode="contained"
        style={styles.button}
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
