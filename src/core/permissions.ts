import { Alert, Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

const renderAlert = (): boolean => {
  Alert.alert(
    'Error',
    'Can not get camera permissions',
    [
      {
        text: 'close',
        onPress: () => {},
      },
    ],
    { cancelable: false },
  );
  return false;
};

export const checkStoragePermissions = async () => {
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
        renderAlert();
      }
    } else {
      const statuses = await requestMultiple([
        // PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);
      if (Object.values(statuses).every(el => el === 'granted')) {
        return true;
      } else {
        renderAlert();
      }
    }
  } catch (e) {
    renderAlert();
  }
};
