import { setI18nConfig } from '@i18n';
import { ConsoleUtils } from '@utils';
import { Navigation } from 'react-native-navigation';
import { registerComponent, GNav } from './helper';

setI18nConfig();
registerComponent();

class App {
  constructor() {
    Navigation.events().registerAppLaunchedListener(() => {
      ConsoleUtils.l('App Started');
      GNav.setRootAuth();
    });
  }
}

export default new App();
