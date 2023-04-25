import React, {useRef, useState} from 'react';
import {Keyboard} from 'react-native';

import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import parsePhoneNumberFromString, {CountryCode} from 'libphonenumber-js';
import {observer} from 'mobx-react-lite';

import {Account} from '../../../services/account';
import UserService from '../../../services/user';

import {flashMessage} from '../../../core/utils';

import {codeValidator, phoneNumberValidator} from '../../../core/validators';
import {useStore} from '../../../store';
import {Navigation} from '../../../types';
import LoginView, {validateObject} from './loginView';

type Props = {
  navigation: Navigation;
};

const LoginContainer = ({navigation}: Props): JSX.Element => {
  const {userStore} = useStore();
  const initialCountry = userStore.user.countryCode;

  const inputRef = useRef(null);

  //phone state
  const [phoneNumber, setPhoneNumber] = useState<validateObject>({
    value: '',
    error: '',
  });
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [iso, setIso] = useState('');

  //code state
  const [code, setCode] = useState<validateObject>({value: '', error: ''});

  //loading state
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [isLoginAvailable, setIsLoginAvailable] = useState(false);

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  const sendOTPCode = async () => {
    Keyboard.dismiss();
    setPhoneNumber(prev => ({...prev, error: ''}));
    setOtpLoading(true);
    try {
      const phoneNumberError = phoneNumberValidator(phoneNumber.value);

      if (phoneNumberError || !isValidPhoneNumber) {
        setOtpLoading(false);
        setPhoneNumber(prev => ({...prev, error: phoneNumberError}));
        return;
      }

      const {data} = await UserService.verifyPhoneNumber(phoneNumber.value);

      if (data.message === 'User exists') {
        const confirmation = await Account.signInWithPhoneNumber(
          phoneNumber.value,
        );
        setConfirm(confirmation);
        setIsLoginAvailable(true);
      } else {
        setPhoneNumber(prev => ({...prev, error: 'User does not exist'}));
      }
    } catch (error) {
      flashMessage({type: 'danger', message: 'Internal error occured!'});
    }
    setOtpLoading(false);
  };

  const login = async () => {
    Keyboard.dismiss();
    setCode(prev => ({...prev, error: ''}));
    setLoading(true);
    try {
      const codeError = codeValidator(code.value);

      if (codeError) {
        setLoading(false);
        setCode(prev => ({...prev, error: codeError}));
        return;
      }

      await confirm?.confirm(code.value);

      const uid = await Account.getUid();

      if (uid) {
        const token = await Account.getToken();

        if (token) {
          const {data} = await UserService.getUserData();

          if (data) {
            const userData = {
              uid,
              username: data.username,
              phoneNumber: data.phoneNumber,
              email: data?.email || '',
            };
            userStore.updateUser(userData);
            userStore.updateAuthStatus(true);
          }
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        setLoading(false);
        setCode(prev => ({...prev, error: 'Invalid SMS-code'}));
        return;
      } else {
        flashMessage({type: 'danger', message: 'Internal error occured!'});
      }
    }
    setLoading(false);
  };

  const onChangePhoneNumber = (phone: string) => {
    const phoneNumberString = parsePhoneNumberFromString(
      `Phone: ${phone}.`,
      `${iso as CountryCode}`,
    );
    const format = String(phoneNumberString?.formatInternational());
    const isValid = Boolean(phoneNumberString?.isValid());
    const standFormat = format.replace(/[^0-9+]/g, '');

    setIsValidPhoneNumber(isValid);
    setPhoneNumber({value: standFormat, error: phoneNumber.error});
  };

  const onSelectCountry = (iso2: string) => {
    setIso(iso2);
  };

  return (
    <LoginView
      code={code}
      initialCountry={initialCountry}
      inputRef={inputRef}
      isLoginAvailable={isLoginAvailable}
      loading={loading}
      login={login}
      navigation={navigation}
      otpLoading={otpLoading}
      phoneNumber={phoneNumber}
      sendOTPCode={sendOTPCode}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onChangePhoneNumber={onChangePhoneNumber}
      onSelectCountry={onSelectCountry}
    />
  );
};

export default observer(LoginContainer);
