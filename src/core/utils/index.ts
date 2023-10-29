import { ACCESS_KEY } from '@constants';
import { format } from 'date-fns';
import { MessageOptions, showMessage } from 'react-native-flash-message';
import publicIP from 'react-native-public-ip';

interface IUserLocation {
  country_code2: string;
}

const getUserCurrentCountry = async (): Promise<string> => {
  const userLocation: IUserLocation = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${ACCESS_KEY}&ip=${await publicIP()}`,
  ).then(res => res.json());

  if (!userLocation) {
    return '';
  }

  return userLocation?.country_code2?.toLowerCase();
};

const flashMessage = ({ message, description, type }: MessageOptions): void => {
  showMessage({
    message: message,
    description: description,
    type: type,
    duration: 1800,
  });
};

const formatDateFromSeconds = (seconds: number): string =>
  format(new Date(seconds * 1000), 'dd/MM/yyyy hh:mm:ss');

export { getUserCurrentCountry, flashMessage, formatDateFromSeconds };
