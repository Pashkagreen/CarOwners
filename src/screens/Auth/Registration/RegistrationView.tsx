import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInputComponent from 'react-native-phone-input';

import {
  Background,
  Button,
  Logo,
  PhoneInput,
  TextInput,
  Title,
} from '../../../components/index';

import styles from './styles';

import { AuthStackParams } from '../../../navigation/AuthStack';
import { IValidateObject } from '../../../types';

interface IRegistration {
  navigateTo: (screenName: keyof AuthStackParams) => () => void;
  phoneNumber: IValidateObject;
  code: IValidateObject;
  username: IValidateObject;
  loading: boolean;
  otpLoading: boolean;
  isSignUpAvailable: boolean;
  sendOTPCode: () => void;
  setUsername: React.Dispatch<React.SetStateAction<IValidateObject>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<IValidateObject>>;
  setCode: React.Dispatch<React.SetStateAction<IValidateObject>>;
  onChange: (cb: any) => (text: string) => void;
  onSignUpPressed: () => void;
  inputRef: React.Ref<PhoneInputComponent>;
  initialCountry: string;
  onSelectCountry: (iso2: string) => void;
  onChangePhoneNumber: (phone: string) => void;
  errorText?: string;
}

const RegistrationView: FC<IRegistration> = ({
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
}) => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <Background>
      <Logo />
      <Title>Create Account</Title>
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
          keyboardType="phone-pad"
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
