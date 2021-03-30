import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

export class Fabric {
  private static anInstance = analytics();
  private static crInstance = crashlytics();

  static logEvent = (name: string, params?: { [key: string]: any }) => {
    Fabric.anInstance.logEvent(name, params);
    console.log(
      `---tracking event--- with name:${name} and params: ${JSON.stringify(
        params,
      )}`,
    );
  };

  static log = (message: string) => {
    Fabric.crInstance.log(message);
    console.log(`---log message---: ${message}`);
  };

  static recordError = (error: Error, jsErrorName?: string | undefined) => {
    Fabric.crInstance.recordError(error, jsErrorName);
    console.log(`---record error---: ${error} with name: ${jsErrorName}`);
  };
}

export const handleFabricLogin = (user: any) => {
  try {
    const json = JSON.stringify(user);
    const cInstance = crashlytics();
    const aInstance = analytics();

    cInstance.setUserId(user.id);
    cInstance.setAttribute('user', json);

    aInstance.setUserProperty('user', json);
    aInstance.setUserId(user.id);
  } catch (error) {
    console.log('Set Fabric properties error: ', error);
  }
};
