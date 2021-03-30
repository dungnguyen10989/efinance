import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  networking,
  asyncStorage,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
// import AsyncStorage from '@react-native-community/async-storage';

const configs = {
  // host: '10.20.133.21', // change to your IP Address to debug in release mode
  host: 'localhost',
  port: 9090, // identify port for Reactotron, disabled if use default port
};

Reactotron.configure({
  host: configs.host,
  port: configs.port,
  name: 'Base-Platform',
})
  .useReactNative({
    // asyncStorage: true, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: true, // there are more options to editor
    errors: {
      veto: () => false,
    }, // or turn it off with false
    overlay: true, // just turning off overlay,
    storybook: true,
  })
  // .setAsyncStorageHandler(AsyncStorage)
  .use(trackGlobalErrors({}))
  .use(openInEditor())
  .use(networking())
  .use(reactotronRedux())
  .use(
    asyncStorage({
      ignore: ['secret'],
    }),
  );
// .use(sagaPlugin({}));

Reactotron.connect();

const yeOldeConsoleLog = console.log;
const yeOldeConsoleWarn = console.warn;
const yeOldeConsoleError = console.error;
const yeOldeConsoleException = console.exception;

const display = (msg, args, important) => {
  Reactotron.display({
    name: `${msg}`,
    important,
    value: args,
    preview:
      args && args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

console.log = (...args) => {
  yeOldeConsoleLog(...args);
  display('LOG', args);
};

console.warn = (...args) => {
  yeOldeConsoleWarn(...args);
  display('WARN', args, true);
};

console.error = (...args) => {
  yeOldeConsoleError(...args);
  display('ERROR', args, true);
};

console.exception = (...args) => {
  yeOldeConsoleException(...args);
  display('EXCEPTION', args, true);
};

export { Reactotron };
