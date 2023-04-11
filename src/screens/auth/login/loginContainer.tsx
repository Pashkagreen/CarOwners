import React, {useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import parsePhoneNumberFromString, {CountryCode} from 'libphonenumber-js';
import {observer} from 'mobx-react-lite';

import {Account} from '../../../services/account';
import UserService from '../../../services/user';

import {codeValidator, phoneNumberValidator} from '../../../core/utils';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [isLoginAvailable, setIsLoginAvailable] = useState<boolean>(false);

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
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
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

      //after success confirm, we login on the back-end side
      const uid = await Account.getUid();

      if (uid) {
        const {data} = await UserService.login(uid);

        if (data.accessToken) {
          await Account.setAccessToken(data.accessToken);
          const userData = {
            uid,
            username: data.username,
            phoneNumber: data.phoneNumber,
          };
          userStore.updateUser(userData);
          userStore.updateAuthStatus(true);
          // navigation.navigate('Main');
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        setCode(prev => ({...prev, error: 'Invalid SMS-code'}));
        return;
      }
    } finally {
      setLoading(false);
    }
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

  const onAuthStateChanged = (firebaseUser: FirebaseAuthTypes.User | null) => {
    if (firebaseUser) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <>
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
    </>
  );
};

export default observer(LoginContainer);
