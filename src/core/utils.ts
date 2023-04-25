import {MessageOptions, showMessage} from 'react-native-flash-message';
import publicIP from 'react-native-public-ip';

export const getUserCurrentCountry = async (): Promise<string> => {
  let res;
  try {
    const ACCESS_KEY = 'bcf8028e033e2094a6cebda23275f95b';
    const publicIpAddress = await publicIP();
    const url = `http://api.ipstack.com/${publicIpAddress}?access_key=${ACCESS_KEY}&format=1`;
    res = await fetch(url);
    res = await res.json();
    if (res.error) {
      return '';
    }

    return res.country_code.toLowerCase();
  } catch (err) {
    return '';
  }
};

export const flashMessage = ({
  message,
  description,
  type,
}: MessageOptions): void => {
  showMessage({
    message: message,
    description: description,
    type: type,
    duration: 1800,
  });
};

export const formatDateFromSeconds = (seconds: number): string => {
  const date = new Date(seconds * 1000); // convert to milliseconds
  const day = date.getDate().toString().padStart(2, '0'); // get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // get month (adding 1 because January is 0) and pad with leading zero if necessary
  const year = date.getFullYear().toString(); // get full year
  const hours = date.getHours().toString().padStart(2, '0'); // get hours and pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, '0'); // get minutes and pad with leading zero if necessary
  return `${day}/${month}/${year} ${hours}:${minutes}`; // concatenate and return the formatted date string
};
