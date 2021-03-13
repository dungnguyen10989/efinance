import Login from '@containers/auth/login';

import {
  Navigation,
  Layout,
  Options,
  NavigationComponentProps,
} from 'react-native-navigation';

import { routes } from './routes';
import { colors } from '@values';
import { t } from '@i18n';
import { Overlay, Dialog } from '@containers/_nav';
// import OneSignal from 'react-native-onesignal';

const genTabLayout = (
  tabName: string,
  headerName?: string,
  bg = colors.primary,
): Layout => {
  const id = Object(routes)[tabName];
  return {
    stack: {
      children: [
        {
          component: {
            name: id,
            id,
            options: {
              topBar: {
                background: {
                  color: bg,
                },
                title: headerName
                  ? { component: { name: headerName } }
                  : {
                      text: t(`title.${tabName}`),
                    },
              },
              bottomTabs: {
                visible: true,
              },
              bottomTab: {
                text: t(`title.${tabName}`),
                // icon: Object(assets.glife)[tabName],
              },
            },
          },
        },
      ],
    },
  };
};

class GNav {
  static rootId: string;
  static componentId: string;
  static componentName: string;
  static componentType: string;
  static loadingId?: string;
  static alertId?: string;
  static unauthorizedNotification?: any;
  static oneSignalToken?: any;

  static constants = () => Navigation.constants();

  static dismissAllModals = () => Navigation.dismissAllModals();

  static dismissModal = (
    componentId = GNav.componentId,
    mergeOptions?: Options,
  ) => Navigation.dismissModal(componentId, mergeOptions);

  static dismissOverlay = (componentId = GNav.componentId) =>
    Navigation.dismissOverlay(componentId);

  static events = () => Navigation.events();

  static mergeOptions = (
    componentId = GNav.componentId,
    mergeOptions: Options,
  ) => Navigation.mergeOptions(componentId, mergeOptions);

  static pop = (componentId = GNav.componentId, mergeOptions?: Options) =>
    Navigation.pop(componentId, mergeOptions);

  static popTo = (componentId = GNav.componentId, mergeOptions?: Options) =>
    Navigation.popTo(componentId, mergeOptions);

  static popToRoot = (componentId = GNav.componentId, mergeOptions?: Options) =>
    Navigation.popToRoot(componentId, mergeOptions);

  static push = (componentId = GNav.componentId, layout: Layout) => {
    Navigation.push(componentId, layout);
  };

  static setStackRoot = (componentId = GNav.componentId, layout: Layout) =>
    Navigation.setStackRoot(componentId, layout);

  static showModal = (layout: Layout) => Navigation.showModal(layout);

  static showOverlay = (layout: Layout) => Navigation.showOverlay(layout);

  static updateProps = (componentId = GNav.componentId, props: any) =>
    Navigation.updateProps(componentId, props);

  static setRootAuth = (params?: { user: any }) => {
    return Navigation.setRoot({
      root: {
        stack: {
          id: routes._authStack,
          children: [
            {
              component: {
                name: params?.user ? routes.login : routes.updateUserInfo,
                options: {
                  topBar: {
                    visible: Boolean(params?.user),
                  },
                },
                passProps: {
                  params,
                  label: t('requestUpdateInfo'),
                },
              },
            },
          ],
        },
      },
    });
  };

  static setRootMain = (id?: number) => {
    // id && OneSignal.sendTag('glife_user', `${id}`);
    return Navigation.setRoot({
      root: {
        bottomTabs: {
          id: routes._rootTabs,
          children: [
            genTabLayout('tab_0'),
            genTabLayout('tab_1'),
            genTabLayout('tab_2'),
            genTabLayout('tab_3'),
          ],
        },
      },
    });
  };

  static setRootTest = () => {
    return Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'test',
              },
            },
          ],
        },
      },
    });
  };
}

const registerComponent = () => {
  Navigation.registerComponent(routes._overlay, () => Overlay);
  Navigation.registerComponent(routes._dialog, () => Dialog);
  Navigation.registerComponent(routes.login, () => Login);
  Navigation.registerComponent(routes.updateUserInfo, () => Login);
};

export type NavOptions = Options;
export type NavLayout = Layout;
export type NavProps = NavigationComponentProps;

export { GNav, registerComponent };
