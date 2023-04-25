import {useRef, useState} from 'react';
import {Keyboard} from 'react-native';

import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import parsePhoneNumberFromString, {CountryCode} from 'libphonenumber-js';
import {observer} from 'mobx-react-lite';

import {Account} from '../../../services/account';
import UserService from '../../../services/user';

import {flashMessage} from '../../../core/utils';

import {
  codeValidator,
  nameValidator,
  phoneNumberValidator,
} from '../../../core/validators';
import {useStore} from '../../../store';
import {Navigation} from '../../../types';
import {validateObject} from '../login/loginView';
import RegistrationView from './registrationView';

type Props = {
  navigation: Navigation;
};

const RegistrationContainer = ({navigation}: Props): JSX.Element => {
  const {userStore} = useStore();
  const initialCountry = userStore.user.countryCode;

  const inputRef = useRef(null);
  const [username, setUsername] = useState<validateObject>({
    value: '',
    error: '',
  });

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
  const [isSignUpAvailable, setIsSignUpAvailable] = useState(false);

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

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

  const sendOTPCode = async () => {
    Keyboard.dismiss();
    setPhoneNumber(prev => ({...prev, error: ''}));
    setOtpLoading(true);
    try {
      const usernameError = nameValidator(username.value);
      const phoneNumberError = phoneNumberValidator(phoneNumber.value);

      if (usernameError || phoneNumberError || !isValidPhoneNumber) {
        setOtpLoading(false);
        setPhoneNumber(prev => ({...prev, error: phoneNumberError}));
        setUsername(prev => ({...prev, error: usernameError}));
        return;
      }

      const {data} = await UserService.verifyPhoneNumber(phoneNumber.value);

      if (data.message === 'User exists') {
        setPhoneNumber(prev => ({...prev, error: 'User already exists'}));
      } else {
        const confirmation = await Account.signInWithPhoneNumber(
          phoneNumber.value,
        );
        setConfirm(confirmation);
        setIsSignUpAvailable(true);
      }
    } catch (error) {
      flashMessage({type: 'danger', message: 'Internal error occured!'});
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
        setCode({...code, error: codeError});
        return;
      }

      await confirm?.confirm(code.value);

      const uid = await Account.getUid();

      if (uid) {
        const token = await Account.getToken();

        if (token) {
          const {data} = await UserService.registration({
            phoneNumber: phoneNumber.value,
            username: username.value,
          });

          const userData = {
            uid: data.uid,
            username: data.username,
            phoneNumber: data.phoneNumber,
          };
          userStore.updateUser(userData);
          userStore.updateAuthStatus(true);
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
