import { Linking } from 'react-native';
import { PopupManager } from './popup';
import { StringPrototype } from './prototype';
import { t } from '@i18n';
import { constants } from '@values';

const makeCall = (phone: string) => {
  const phoneWithoutSpaces = StringPrototype.removeAllSpaces(phone);
  const url = `tel:${phoneWithoutSpaces}`;
  Linking.openURL(url).catch((error) => {
    console.log('makeCall error', error);
    PopupManager.alert({
      title: t('failure'),
      message: t('cannotMakeCall', { phone }),
    });
  });
};

const mailTo = (email: string) => {
  const url = `mailto:${email}`;
  Linking.openURL(url).catch((error) => {
    console.log('mailTo error', error);
    PopupManager.alert({
      title: t('failure'),
      message: t('cannotMailTo', { email }),
    });
  });
};

const openUrl = (url: string) => {
  Linking.openURL(url).catch((error) => {
    console.log('openUrl error', error);
    PopupManager.alert({
      title: t('failure'),
      message: t('cannotOpenURL', {
        url: StringPrototype.cutLongString(url, 20),
      }),
    });
  });
};

const directToLocation = (lat: number, lng: number, name = '') => {
  const scheme = constants.isIos ? 'maps:0,0?q=' : 'geo:0,0?q=';
  const latLng = `${lat},${lng}`;
  const _url = constants.isIos
    ? `${scheme}${name}@${latLng}`
    : `${scheme}${latLng}(${name})`;

  openUrl(_url);
};

export const DeviceManager = {
  makeCall,
  openUrl,
  mailTo,
  directToLocation,
};
