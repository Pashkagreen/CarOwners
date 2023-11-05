import { FC, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';

import usePhoneNumber from '@hooks/use-phone-number';
import { AuthStackParams } from '@navigation/roots/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackScreenProps } from '@react-navigation/stack';
import { Account } from '@services/account';
import UserService from '@services/endpoints/user';
import { useStore } from '@stores';
import { IValidateObject } from '@types';
import {
  codeValidator,
  nameValidator,
  phoneNumberValidator,
} from '@validators';
import { observer } from 'mobx-react-lite';

import RegistrationView from './view.tsx';

export type TProps = StackScreenProps<AuthStackParams, 'Registration'>;

const RegistrationContainer: FC<TProps> = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const {
    userStore: {
      user: { countryCode },
      updateHeaderHeight,
      registerUser,
    },
  } = useStore();

  const inputRef = useRef(null);
  const [username, setUsername] = useState<IValidateObject>({
    value: '',
    error: '',
  });

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
  const [isSignUpAvailable, setIsSignUpAvailable] = useState(false);

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  const sendOTPCode = async () => {
    Keyboard.dismiss();
    setPhoneNumber(prev => ({ ...prev, error: '' }));
    setOtpLoading(true);
    try {
      const usernameError = nameValidator(username.value);
      const phoneNumberError = phoneNumberValidator(phoneNumber.value);

      if (usernameError || phoneNumberError || !isValidPhoneNumber) {
        setOtpLoading(false);
        setPhoneNumber(prev => ({
          ...prev,
          error: phoneNumberError,
        }));
        setUsername(prev => ({ ...prev, error: usernameError }));
        return;
      }

      const { data } = await UserService.verifyPhoneNumber(phoneNumber.value);

      if (data.message === 'User exists') {
        setPhoneNumber(prev => ({ ...prev, error: 'User already exists' }));
      } else {
        const confirmation = await Account.signInWithPhoneNumber(
          phoneNumber.value,
        );
        setConfirm(confirmation);
        setIsSignUpAvailable(true);
      }
    } catch (e) {
      setOtpLoading(false);
    }
    setOtpLoading(false);
  };

  const onSignUpPressed = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      const codeError = codeValidator(code.value);

      if (codeError || !isValidPhoneNumber) {
        setLoading(false);
        setCode({ ...code, error: codeError });
        return;
      }

      await confirm?.confirm(code.value);

      const uid = await Account.getUid();

      if (uid) {
        const token = await Account.getToken();

        if (token) {
          await registerUser(phoneNumber, username);
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

  const onChange =
    (cb: typeof setUsername | typeof setCode) => (text: string) =>
      cb({ value: text, error: '' });

  const navigateTo = (screenName: keyof AuthStackParams) => () => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    if (headerHeight) {
      updateHeaderHeight(headerHeight);
    }
  }, []);

  return (
    <RegistrationView
      code={code}
      initialCountry={countryCode}
      inputRef={inputRef}
      isSignUpAvailable={isSignUpAvailable}
      loading={loading}
      navigateTo={navigateTo}
      otpLoading={otpLoading}
      phoneNumber={phoneNumber}
      sendOTPCode={sendOTPCode}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      setUsername={setUsername}
      username={username}
      onChange={onChange}
      onChangePhoneNumber={onChangePhoneNumber}
      onSelectCountry={onSelectCountry}
      onSignUpPressed={onSignUpPressed}
    />
  );
};

export default observer(RegistrationContainer);
