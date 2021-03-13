import {
  check,
  request,
  openSettings,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';
import { Platform } from 'react-native';
import { PopupManager } from './popup';
import { ConsoleUtils } from './log';
import { t } from '@i18n';

const LOCATION: Permission =
  Platform.OS === 'android'
    ? 'android.permission.ACCESS_FINE_LOCATION'
    : 'ios.permission.LOCATION_WHEN_IN_USE';

const PHOTO_LIBRARY: Permission =
  Platform.OS === 'android'
    ? 'android.permission.READ_EXTERNAL_STORAGE'
    : 'ios.permission.PHOTO_LIBRARY';

const CAMERA = `${Platform.OS}.permission.CAMERA` as Permission;

const READ_CONTACTS: Permission =
  Platform.OS === 'android'
    ? 'android.permission.READ_CONTACTS'
    : 'android.permission.WRITE_CONTACTS';

const WRITE_CONTACTS: Permission = 'android.permission.WRITE_CONTACTS';
const FACE_ID: Permission = 'ios.permission.FACE_ID';

const PERMISSIONS = {
  LOCATION,
  PHOTO_LIBRARY,
  CAMERA,
  FACE_ID,
  READ_CONTACTS,
  WRITE_CONTACTS,
};

const checkPermission = (permission: Permission) => check(permission);

const checkPermissions = (permissions: Permission[]) => {
  return new Promise((resolve) => {
    const arr = permissions.map((permission) => check(permission));
    const result = Promise.all(arr);
    resolve(result);
  }) as Promise<PermissionStatus[]>;
};

const requestPermission = (
  permission: Permission,
  permissionName = '',
  disableUnavailableAlert = false,
  disableOpenSettings = false,
) => {
  return new Promise(async (resolve) => {
    let isGranted = await check(permission);
    ConsoleUtils.l(`Permissions check ${permission}: ${isGranted}`);
    if (isGranted === 'unavailable') {
      PopupManager.alert({
        title: t('alert.error'),
        message: t('permissionUnavailable', {
          permission: permissionName,
        }),
      });
    } else if (isGranted === 'denied') {
      isGranted = await request(permission);
      ConsoleUtils.l(`Permissions request ${permission}: ${isGranted}`);
    } else if (isGranted === 'blocked' && !disableOpenSettings) {
      if (!disableUnavailableAlert) {
        PopupManager.alert({
          title: t('requestPermissionTitle'),
          message: t('requestPermissionMessage', {
            permission: permissionName,
          }),
          buttons: [
            {
              text: t('ok'),
              onPress: openSettings,
            },
            { text: t('cancel') },
          ],
        });
      }
    }

    return resolve(isGranted);
  }) as Promise<PermissionStatus>;
};

export const PermissionsManager = {
  PERMISSIONS,
  checkPermission,
  checkPermissions,
  requestPermission,
};
