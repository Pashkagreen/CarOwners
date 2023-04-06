
import { useState } from 'react';
import { phoneNumberValidator, codeValidator } from '../../../core/utils';
import LoginView from './loginView';
import { Navigation } from '../../../types';

type Props = {
  navigation: Navigation;
};

function LoginContainer({navigation}: Props): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [code, setCode] = useState({ value: '', error: '' });

  const onLoginPressed = () => {
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const codeError = codeValidator(code.value);

    if (phoneNumberError || codeError) {
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      setCode({ ...code, error: codeError });
      return;
    }

    navigation.navigate('Main');
  };

  return (
    <LoginView 
      navigation={navigation}
      code={code}
      phoneNumber={phoneNumber}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onLoginPressed={onLoginPressed}
    />
  );
};

export default LoginContainer;