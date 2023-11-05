import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

import { flashMessage } from '@utils';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

const showError = (): void =>
  flashMessage({
    message: 'Error',
    description:
      'We can not get camera & library permissions. Please enable it in your application settings.',
    type: 'info',
  });

const checkStoragePermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    const checkResult = await Promise.all([
      PermissionsAndroid.check('android.permission.CAMERA'),
      PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE'),
    ]);

    if (!checkResult.every(Boolean)) {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    }

    return true;
  }

  /**
   * Platform.OS === 'IOS'
   */
  const statuses = await requestMultiple([
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
  ]);

  if (!Object.values(statuses).every(el => el === 'granted')) {
    showError();

    return false;
  }

  return true;
};

export default checkStoragePermissions;
