import { useRef, useState } from 'react';
import { Keyboard } from 'react-native';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { observer } from 'mobx-react-lite';

import { Account } from '../../../services/account';
import UserService from '../../../services/user';

import {
  codeValidator,
  nameValidator,
  phoneNumberValidator,
} from '../../../core/validators';
import usePhoneNumber from '../../../hooks/usePhoneNumber';
import { useStore } from '../../../store';
import { Navigation } from '../../../types';
import { validateObject } from '../login/loginView';
import RegistrationView from './registrationView';

type Props = {
  navigation: Navigation;
};

const RegistrationContainer = ({ navigation }: Props): JSX.Element => {
  const { userStore } = useStore();
  const initialCountry = userStore.user.countryCode;

  const inputRef = useRef(null);
  const [username, setUsername] = useState<validateObject>({
    value: '',
    error: '',
  });

  //phone state
  const {
    phoneNumber,
    setPhoneNumber,
    isValidPhoneNumber,
    onChangePhoneNumber,
    onSelectCountry,
  } = usePhoneNumber();

  //code state
  const [code, setCode] = useState<validateObject>({ value: '', error: '' });

  //loading state
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
        setPhoneNumber(prev => ({ ...prev, error: phoneNumberError }));
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
          await userStore.registerUser(phoneNumber, username);
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

  return (
    <RegistrationView
      code={code}
      initialCountry={initialCountry}
      inputRef={inputRef}
      isSignUpAvailable={isSignUpAvailable}
      loading={loading}
      navigation={navigation}
      otpLoading={otpLoading}
      phoneNumber={phoneNumber}
      sendOTPCode={sendOTPCode}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      setUsername={setUsername}
      username={username}
      onChangePhoneNumber={onChangePhoneNumber}
      onSelectCountry={onSelectCountry}
      onSignUpPressed={onSignUpPressed}
    />
  );
};

export default observer(RegistrationContainer);
