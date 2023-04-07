import publicIP from 'react-native-public-ip';

export const phoneNumberValidator = (phone: string): string => {
  const re = /\S+@\S+\.\S+/;

  if (!phone || phone.length <= 0) return 'Phone number cannot be empty.';
  return '';
};

export const codeValidator = (code: string): string => {
  if (!code || code.length <= 0) return 'Code cannot be empty.';

  return '';
};

export const nameValidator = (name: string): string => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const getUserCurrentCountry = async (): Promise<string> => {
  let res;
  try {
    const ACCESS_KEY = 'bcf8028e033e2094a6cebda23275f95b';
    const publicIpAddress = await publicIP();
    const url = `http://api.ipstack.com/${publicIpAddress}?access_key=${ACCESS_KEY}&format=1`;
    res = await fetch(url);
    res = await res.json();
    return res.country_code.toLowerCase();
  } catch (err) {
    return '';
  }
};
