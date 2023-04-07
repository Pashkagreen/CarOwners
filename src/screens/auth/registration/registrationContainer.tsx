import {useRef, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Keyboard} from 'react-native';
import parsePhoneNumberFromString, {CountryCode} from 'libphonenumber-js';

import RegistrationView from './registrationView';
import {phoneNumberValidator, codeValidator} from '../../../core/utils';
import {Navigation} from '../../../types';
import {useStore} from '../../../store';

type Props = {
  navigation: Navigation;
};

const RegistrationContainer = ({navigation}: Props): JSX.Element => {
  const {user} = useStore();
  const initialCountry = user.user.countryCode;

  const inputRef = useRef(null);
  const [username, setUsername] = useState({value: '', error: ''});

  const [phoneNumber, setPhoneNumber] = useState({value: '', error: ''});
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [iso, setIso] = useState('');

  const [code, setCode] = useState({value: '', error: ''});

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

  const onSignUpPressed = () => {
    Keyboard.dismiss();

    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const codeError = codeValidator(code.value);
    //To Do
    const usernameError = codeValidator(username.value);

    if (phoneNumberError || codeError || usernameError) {
      setPhoneNumber({...phoneNumber, error: phoneNumberError});
      setCode({...code, error: codeError});
      setUsername({...username, error: usernameError});
      return;
    }

    navigation.navigate('Main');
  };

  return (
    <RegistrationView
      inputRef={inputRef}
      initialCountry={initialCountry}
      navigation={navigation}
      code={code}
      phoneNumber={phoneNumber}
      username={username}
      onSelectCountry={onSelectCountry}
      onChangePhoneNumber={onChangePhoneNumber}
      setUsername={setUsername}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onSignUpPressed={onSignUpPressed}
    />
  );
};

export default observer(RegistrationContainer);
