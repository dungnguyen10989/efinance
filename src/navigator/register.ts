import Login from '@containers/auth/login';
import { routes } from './routes';
import { Navigation } from 'react-native-navigation';
import { Overlay, Dialog } from '@containers/_nav';

export const registerComponent = () => {
  Navigation.registerComponent(routes._overlay, () => Overlay);
  Navigation.registerComponent(routes._dialog, () => Dialog);
  Navigation.registerComponent(routes.login, () => Login);
  Navigation.registerComponent(routes.updateUserInfo, () => Login);
};
