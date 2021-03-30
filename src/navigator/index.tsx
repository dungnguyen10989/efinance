import { setI18nConfig, t } from '@i18n';
import { Fabric, PopupManager } from '@utils';
import { Navigation } from 'react-native-navigation';
import codePush, { CodePushOptions } from 'react-native-code-push';

import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { GNav } from './helper';
import { registerComponent } from './register';
import { Linking } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

async function bootstrap() {
  await inAppMessaging().setMessagesDisplaySuppressed(true);
}

setI18nConfig();
registerComponent();

Navigation.events().registerComponentDidAppearListener(
  async ({ componentName, componentType, componentId, passProps }) => {
    console.log(
      `ComponentDidAppear: ${componentName} \nwith type: ${componentType} \nand id: ${componentId} \n and props: `,
      passProps,
    );
    if (componentType === 'Component') {
      await analytics().logScreenView({
        screen_name: componentName,
        screen_class: componentType,
      });
    }
  },
);

const { SyncStatus } = codePush;

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: t('alert.updateVerTitle'),
    appendReleaseDescription: true,
    mandatoryContinueButtonLabel: t('alert.updateNow'),
    optionalIgnoreButtonLabel: t('cancel'),
    optionalInstallButtonLabel: t('alert.updateNow'),
    optionalUpdateMessage: '',
    mandatoryUpdateMessage: '',
    descriptionPrefix: '',
  },
};

class App {
  constructor() {
    Navigation.events().registerAppLaunchedListener(() => {
      codePush.sync(
        codePushOptions,
        (status) => {
          switch (status) {
            case SyncStatus.CHECKING_FOR_UPDATE:
              // PopupManager.showLoading();
              break;
            case SyncStatus.UNKNOWN_ERROR:
            case SyncStatus.UPDATE_IGNORED:
            case SyncStatus.UPDATE_INSTALLED:
            case SyncStatus.UP_TO_DATE:
              // PopupManager.dismissLoading();

              break;
            default:
              return;
          }
        },
        (progress) => {},
        (update) => {},
      );

      Fabric.log('App mounted.');
      bootstrap();
      GNav.setRootAuth();
    });

    remoteConfig()
      .fetchAndActivate()
      .then((value) => {
        const s = remoteConfig().getValue('test');
        const parameters = remoteConfig().getAll();

        console.log('remoteConfig', value, s, parameters);
      });

    messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    messaging()
      .requestPermission()
      .then((authStatus) => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          PopupManager.alert({
            title: t('alert.requestNotiTitle'),
            message: t('alert.requestNotiMessage'),
            buttons: [
              {
                text: t('alert.ok'),
                onPress: () => Linking.openURL('app-settings://'),
              },
              {
                text: t('alert.cancel'),
              },
            ],
          });
        } else {
          messaging()
            .getToken()
            .then((token) => {
              console.log('FirebaseToken: ' + token);
            });
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }
}

export default codePush()(new App());
