import React, { FC, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { Account } from '../../../services/account';
import UserService from '../../../services/endpoints/user';

import { codeValidator, phoneNumberValidator } from '../../../core/validators';
import { usePhoneNumber } from '../../../hooks';
import { AuthStackParams } from '../../../navigation/roots/auth';
import { useStore } from '../../../store';
import { IValidateObject } from '../../../types';
import LoginView from './LoginView';

export type TProps = StackScreenProps<AuthStackParams, 'Login'>;

const LoginContainer: FC<TProps> = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const {
    userStore: {
      user: { countryCode },
      getAndSetAuthUser,
      updateHeaderHeight,
    },
  } = useStore();

  const inputRef = useRef(null);

  /**
   * Phone state
   */
  const {
    phoneNumber,
    setPhoneNumber,
    isValidPhoneNumber,
    onChangePhoneNumber,
    onSelectCountry,
  } = usePhoneNumber();

  /**
   * OTP state
   */
  const [code, setCode] = useState<IValidateObject>({ value: '', error: '' });

  /**
   * Loading state
   */
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoginAvailable, setIsLoginAvailable] = useState(false);

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  const sendOTPCode = async () => {
    Keyboard.dismiss();
    setPhoneNumber(prev => ({ ...prev, error: '' }));
    setOtpLoading(true);
    try {
      const phoneNumberError = phoneNumberValidator(phoneNumber.value);

      if (phoneNumberError || !isValidPhoneNumber) {
        setOtpLoading(false);
        setPhoneNumber(prev => ({ ...prev, error: phoneNumberError }));
        return;
      }

      const { data } = await UserService.verifyPhoneNumber(phoneNumber.value);

      if (data.message === 'User exists') {
        const confirmation = await Account.signInWithPhoneNumber(
          phoneNumber.value,
        );
        setConfirm(confirmation);
        setIsLoginAvailable(true);
      } else if (data.message === 'User not found!') {
        setPhoneNumber(prev => ({ ...prev, error: 'User does not exist' }));
      }
    } catch (e: any) {
      setOtpLoading(false);
    }
    setOtpLoading(false);
  };

  const login = async () => {
    Keyboard.dismiss();
    setCode(prev => ({ ...prev, error: '' }));
    setLoading(true);
    try {
      const codeError = codeValidator(code.value);

      if (codeError) {
        setLoading(false);
        setCode(prev => ({ ...prev, error: codeError }));
        return;
      }

      await confirm?.confirm(code.value);

      const uid = await Account.getUid();

      if (uid) {
        const token = await Account.getToken();

        if (token) {
          await getAndSetAuthUser(uid);
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        setLoading(false);
        setCode(prev => ({ ...prev, error: 'Invalid SMS-code' }));
        return;
      }
    }
    setLoading(false);
  };

  const onChange = (cb: typeof setCode) => (text: string) =>
    cb(prev => ({ ...prev, value: text }));

  const navigateTo = (screenName: keyof AuthStackParams) => () => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    if (headerHeight) {
      updateHeaderHeight(headerHeight);
    }
  }, []);

  return (
    <LoginView
      code={code}
      initialCountry={countryCode}
      inputRef={inputRef}
      isLoginAvailable={isLoginAvailable}
      loading={loading}
      login={login}
      navigateTo={navigateTo}
      otpLoading={otpLoading}
      phoneNumber={phoneNumber}
      sendOTPCode={sendOTPCode}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onChange={onChange}
      onChangePhoneNumber={onChangePhoneNumber}
      onSelectCountry={onSelectCountry}
    />
  );
};

export default observer(LoginContainer);
