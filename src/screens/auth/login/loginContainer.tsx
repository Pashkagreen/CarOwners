import {useRef, useState} from 'react';
import {phoneNumberValidator, codeValidator} from '../../../core/utils';
import LoginView from './loginView';
import {Navigation} from '../../../types';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../../store';
import {Keyboard} from 'react-native';
import parsePhoneNumberFromString, {CountryCode} from 'libphonenumber-js';

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

    if (phoneNumberError || codeError) {
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
      inputRef={inputRef}
      initialCountry={initialCountry}
      navigation={navigation}
      code={code}
      phoneNumber={phoneNumber}
      onSelectCountry={onSelectCountry}
      onChangePhoneNumber={onChangePhoneNumber}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onLoginPressed={onLoginPressed}
    />
  );
};

export default observer(LoginContainer);
