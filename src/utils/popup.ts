import { assets } from '@assets';
import { t } from '@i18n';
import { DeviceEventEmitter, Platform } from 'react-native';
import { IDialog, IOverlay } from 'screen-props';
import {
  ActionSheetIOS,
  ActionSheetIOSOptions as Option,
  ShareActionSheetIOSOptions as ShareOption,
} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import Toast from 'react-native-simple-toast';
import {
  PERMISSIONS,
  checkPermission,
  requestPermission,
  checkPermissions,
} from './permissions';
import ImageCropPicker, {
  Image,
  Options,
} from 'react-native-image-crop-picker';
import { colors, events } from '@values';
import { GNav } from '@navigator/helper';
import { routes } from '@navigator/routes';
import { OptionsModalPresentationStyle } from 'react-native-navigation';
import { openSettings, Permission } from 'react-native-permissions';

type Response =
  | { success: true; images: Image[] }
  | { success: false; error: string | Error };

type ResponseSingle =
  | { success: true; images: Image }
  | { success: false; error: string | Error };

const showOverlay = async (params?: IOverlay) => {
  if (!GNav.loadingId) {
    const componentId = await GNav.showModal({
      component: {
        name: routes._overlay,
        passProps: params,
        options: {
          layout: {
            componentBackgroundColor: colors.overlay,
          },
          animations: {
            showModal: {
              enabled: false,
            },
            dismissModal: {
              enabled: false,
            },
          },
          modalPresentationStyle: OptionsModalPresentationStyle.overFullScreen,
        },
      },
    });

    GNav.loadingId = componentId;
  }
};

const dismissOverlay = async () => {
  if (GNav.loadingId) {
    await GNav.dismissModal(GNav.loadingId);
    GNav.loadingId = undefined;
  }
};

const DURATION = {
  long: Toast.LONG,
  short: Toast.SHORT,
};

const GRAVITY = {
  top: Toast.TOP,
  center: Toast.CENTER,
  bottom: Toast.BOTTOM,
};

const commonOptions: Options = {
  writeTempFile: true,
  mediaType: 'photo',
  includeBase64: true,
  compressImageQuality: 0.8,
  width: 960,
  height: 1280,
};

export class PopupManager {
  static showOverlay = (params?: IOverlay) => showOverlay(params);

  static dismissOverlay = () => dismissOverlay();

  static showProtectedOverlay = () =>
    showOverlay({
      img: assets.icon.ic_shield,
      label: t('alert.protectTransaction'),
    });

  static alert = async (params?: IDialog) => {
    if (!GNav.alertId) {
      const componentId = await GNav.showOverlay({
        component: {
          name: routes._dialog,
          passProps: { params },
          options: {
            layout: {
              componentBackgroundColor: colors.transparent,
            },
            modalPresentationStyle: OptionsModalPresentationStyle.formSheet,
          },
        },
      });
      GNav.alertId = componentId;
    } else {
      DeviceEventEmitter.emit(events.showDialog, params);
    }
  };

  static showActionSheetWithOptions = (
    options: Option,
    callback: (buttonIndex: number) => void,
  ) => {
    const staticClass = Platform.OS === 'ios' ? ActionSheetIOS : ActionSheet;
    staticClass.showActionSheetWithOptions(
      { ...commonOptions, ...options },
      callback,
    );
  };

  private static showCameraSheet = (
    title = '',
    multiple = false,
  ): Promise<any> => {
    return new Promise((resolve) => {
      const callback = async (index: number) => {
        if (index > 1) {
          return resolve({ success: false, error: 'User cancelled' });
        }
        const isCamera = index === 0;
        const { CAMERA, PHOTO_LIBRARY } = PERMISSIONS;
        const permission = isCamera ? CAMERA : PHOTO_LIBRARY;
        let name = t(isCamera ? 'cameraPermission' : 'libraryPermission');

        try {
          const isGranted = await PopupManager.requestPermission({
            permission,
            permissionName: name,
          });
          if (isGranted === 'granted') {
            const action = isCamera
              ? ImageCropPicker.openCamera
              : ImageCropPicker.openPicker;

            const images = (await action({
              ...commonOptions,
              multiple,
            })) as any;
            resolve({ success: true, images });
          } else {
            PopupManager.alert({
              title: t('alert.alert'),
              message: t('permissionUnavailable', {
                permission: name,
              }),
            });
            resolve({ success: false, error: `${permission} unavailable` });
          }
        } catch (error) {
          console.log('ImagePicker error: ', error);
          resolve({ success: false, error });
        }
      };
      PopupManager.showActionSheetWithOptions(
        {
          title,
          options: [t('capture'), t('library'), t('cancel')],
          cancelButtonIndex: 2,
        },
        callback,
      );
    });
  };

  static showCameraSheetMultiple = (title?: string): Promise<Response> =>
    PopupManager.showCameraSheet(title, true);

  static showCameraSheetSingle = (title?: string): Promise<ResponseSingle> =>
    PopupManager.showCameraSheet(title, false);

  static showShareActionSheetWithOptions = (
    options: ShareOption,
    failureCallback: (error: Error) => void,
    successCallback: (success: boolean, method: string) => void,
  ) => {
    const staticClass = Platform.OS === 'ios' ? ActionSheetIOS : ActionSheet;
    staticClass.showShareActionSheetWithOptions(
      options,
      failureCallback,
      successCallback,
    );
  };
  static showToast = (
    message: string,
    duration?: number | undefined,
    viewControllerBlacklist?: string[] | undefined,
  ) => Toast.show(message, duration, viewControllerBlacklist);

  static showToastWithGravity = (
    message: string,
    duration: keyof typeof DURATION,
    gravity: keyof typeof GRAVITY,
    viewControllerBlacklist?: string[] | undefined,
  ) =>
    Toast.showWithGravity(
      message,
      DURATION[duration],
      GRAVITY[gravity],
      viewControllerBlacklist,
    );

  static requestPermission = (params: {
    permission: Permission;
    permissionName: string;
    disableUnavailableAlert?: boolean;
    disableOpenSettings?: boolean;
  }) => {
    const onUnavailable = () => {
      PopupManager.alert({
        title: t('alert.error'),
        message: t('permissionUnavailable', {
          permission: params.permissionName,
        }),
      });
    };

    const onRequestOpenSettings = () => {
      PopupManager.alert({
        title: t('requestPermissionTitle'),
        message: t('requestPermissionMessage', {
          permission: params.permissionName,
        }),
        buttons: [
          {
            text: t('ok'),
            onPress: openSettings,
          },
          { text: t('cancel') },
        ],
      });
    };

    return requestPermission({
      ...params,
      onUnavailable,
      onRequestOpenSettings,
    });
  };

  static checkPermission = checkPermission;
  static checkPermissions = checkPermissions;
  static PERMISSIONS = PERMISSIONS;
}
