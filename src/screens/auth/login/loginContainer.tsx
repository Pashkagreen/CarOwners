import {useRef, useState} from 'react';
import {Keyboard} from 'react-native';

import parsePhoneNumberFromString, {CountryCode} from 'libphonenumber-js';
import {observer} from 'mobx-react-lite';

import {codeValidator, phoneNumberValidator} from '../../../core/utils';

import {useStore} from '../../../store';
import {Navigation} from '../../../types';
import LoginView from './loginView';

type Props = {
  navigation: Navigation;
};

const LoginContainer = ({navigation}: Props): JSX.Element => {
  const {user} = useStore();
  const initialCountry = user.user.countryCode;

  const inputRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState({value: '', error: ''});
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [iso, setIso] = useState('');

  const [code, setCode] = useState({value: '', error: ''});

  const onLoginPressed = () => {
    Keyboard.dismiss();
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const codeError = codeValidator(code.value);

    if (phoneNumberError || codeError || !isValidPhoneNumber) {
      setPhoneNumber({...phoneNumber, error: phoneNumberError});
      setCode({...code, error: codeError});
      return;
    }

    navigation.navigate('Main');
  };

  const onChangePhoneNumber = (phone: string) => {
    const phoneNumberString = parsePhoneNumberFromString(
      `Phone: ${phone}.`,
      `${iso as CountryCode}`,
    );
    const format = String(phoneNumberString?.formatInternational());
    const isValid = Boolean(phoneNumberString?.isValid());

    setIsValidPhoneNumber(isValid);
    setPhoneNumber({value: format, error: phoneNumber.error});
  };

  const onSelectCountry = (iso2: string) => {
    setIso(iso2);
  };

  return (
    <LoginView
      code={code}
      initialCountry={initialCountry}
      inputRef={inputRef}
      navigation={navigation}
      phoneNumber={phoneNumber}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onChangePhoneNumber={onChangePhoneNumber}
      onLoginPressed={onLoginPressed}
      onSelectCountry={onSelectCountry}
    />
  );
};

export default observer(LoginContainer);
