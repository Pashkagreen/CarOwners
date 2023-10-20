import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

import { renderAlert } from './utils';

const checkStoragePermissions = async (): Promise<boolean | undefined> => {
  try {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        (await PermissionsAndroid.check('android.permission.CAMERA')) &&
        (await PermissionsAndroid.check(
          'android.permission.READ_EXTERNAL_STORAGE',
        )) &&
        (await PermissionsAndroid.check(
          'android.permission.WRITE_EXTERNAL_STORAGE',
        ))
      ) {
        return true;
      } else {
        renderAlert('We can not get camera & library permissions');
      }
    } else {
      const statuses = await requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);

      if (Object.values(statuses).every(el => el === 'granted')) {
        return true;
      } else {
        renderAlert('We can not get camera & library permissions');
      }
    }
  } catch (e) {
    renderAlert('We can not get camera & library permissions');
  }
};

export default checkStoragePermissions;
