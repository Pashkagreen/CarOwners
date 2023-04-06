
import { useState } from 'react';
import RegistrationView from './registrationView';
import { phoneNumberValidator, codeValidator } from '../../../core/utils';
import { Navigation } from '../../../types';

type Props = {
  navigation: Navigation;
};

function RegistrationContainer ({navigation}: Props): JSX.Element {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [code, setCode] = useState({ value: '', error: '' });

  const onSignUpPressed = () => {
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    const codeError = codeValidator(code.value);
    //To Do
    const usernameError = codeValidator(username.value)

    if (phoneNumberError || codeError || usernameError) {
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      setCode({ ...code, error: codeError });
      setUsername({...username, error: usernameError})
      return;
    }

    navigation.navigate('Main');
  };

  return <RegistrationView 
      navigation={navigation}
      code={code}
      phoneNumber={phoneNumber}
      username={username}
      setUsername={setUsername}
      setCode={setCode}
      setPhoneNumber={setPhoneNumber}
      onSignUpPressed={onSignUpPressed}
  />;
};

export default RegistrationContainer;