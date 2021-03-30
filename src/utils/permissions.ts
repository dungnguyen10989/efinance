import {
  check,
  request,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';
import { Platform } from 'react-native';

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

export interface RequestParams {
  permission: Permission;
  permissionName: string;
  disableUnavailableAlert?: boolean;
  disableOpenSettings?: boolean;
  onUnavailable?: Function;
  onRequestOpenSettings?: Function;
}

const checkPermission = (permission: Permission) => check(permission);

const checkPermissions = (permissions: Permission[]) => {
  return new Promise((resolve) => {
    const arr = permissions.map((permission) => check(permission));
    const result = Promise.all(arr);
    resolve(result);
  }) as Promise<PermissionStatus[]>;
};

const requestPermission = (params: RequestParams) => {
  return new Promise(async (resolve) => {
    const {
      permission,
      disableUnavailableAlert,
      disableOpenSettings,
      onUnavailable,
      onRequestOpenSettings,
    } = params;
    let isGranted = await check(permission);
    console.log(`Permissions check ${permission}: ${isGranted}`);
    if (isGranted === 'unavailable') {
      onUnavailable?.();
    } else if (isGranted === 'denied') {
      isGranted = await request(permission);
      console.log(`Permissions request ${permission}: ${isGranted}`);
    } else if (isGranted === 'blocked' && !disableOpenSettings) {
      if (!disableUnavailableAlert) {
        onRequestOpenSettings?.();
      }
    }
    return resolve(isGranted);
  }) as Promise<PermissionStatus>;
};

export { PERMISSIONS, checkPermission, checkPermissions, requestPermission };
