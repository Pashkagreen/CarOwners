import { ACCESS_KEY } from '@constants';
import { trackEvent } from 'appcenter-analytics';
import { hasCrashedInLastSession } from 'appcenter-crashes';
import { format } from 'date-fns';
import { MessageOptions, showMessage } from 'react-native-flash-message';
import publicIP from 'react-native-public-ip';

interface IUserLocation {
  country_code2: string;
}

/**
 * Define user location by IP
 */
const getUserCurrentCountry = async (): Promise<string> => {
  const userLocation: IUserLocation = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${ACCESS_KEY}&ip=${await publicIP()}`,
  ).then(res => res.json());

  if (!userLocation) {
    return '';
  }

  return userLocation?.country_code2?.toLowerCase();
};

/**
 * Flash message
 */
const flashMessage = ({ message, description, type }: MessageOptions): void => {
  showMessage({
    message: message,
    description: description,
    type: type,
    duration: 1800,
  });
};

/**
 * Milliseconds to date
 */
const formatDateFromSeconds = (seconds: number): string =>
  format(new Date(seconds * 1000), 'dd/MM/yyyy hh:mm:ss');

/**
 * Check if there was a crash in a previous section
 */
const checkCrash = async (): Promise<void> => {
  const hasCrash = await hasCrashedInLastSession();

  if (!hasCrash) {
    return;
  }

  flashMessage({
    message: 'Sorry for crash in a previous session',
    type: 'info',
    description: 'We are working on it',
  });
};

/**
 * Track AppCenter event
 */
const logEvent = (
  eventName: string,
  properties?: Record<string, string>,
): void => void trackEvent(eventName, properties && properties);

export {
  getUserCurrentCountry,
  flashMessage,
  formatDateFromSeconds,
  checkCrash,
  logEvent,
};
