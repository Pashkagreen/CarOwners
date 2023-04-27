import { useState } from 'react';

import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

import { validateObject } from '../screens/Auth1/Login1/LoginView1';

const usePhoneNumber = () => {
  const [iso, setIso] = useState<CountryCode>('US');

  const [phoneNumber, setPhoneNumber] = useState<validateObject>({
    value: '',
    error: '',
  });
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const onChangePhoneNumber = (phone: string) => {
    const phoneNumberString = parsePhoneNumberFromString(
      `Phone: ${phone}.`,
      `${iso}`,
    );
    const format = String(phoneNumberString?.formatInternational());
    const isValid = Boolean(phoneNumberString?.isValid());
    const standFormat = format.replace(/[^0-9+]/g, '');

    setIsValidPhoneNumber(isValid);
    setPhoneNumber({ value: standFormat, error: phoneNumber.error });
  };

  const onSelectCountry = (iso2: string) => {
    setIso(iso2 as CountryCode);
  };

  return {
    phoneNumber,
    setPhoneNumber,
    isValidPhoneNumber,
    onChangePhoneNumber,
    onSelectCountry,
  };
};

export default usePhoneNumber;
