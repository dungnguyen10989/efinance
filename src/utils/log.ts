const wrapper = (
  action: 'log' | 'logErr' | 'warn' | 'error',
  ...args: any[]
) => {
  const logger =
    action === 'log' || action === 'logErr'
      ? console.log
      : action === 'warn'
      ? console.warn
      : console.error;
  try {
    const title = args.shift();
    if (action === 'logErr') {
      const message = args?.[0] || {};
      return __DEV__ && logger(title, message, message.message);
    }
    __DEV__ && logger(title, ...args);
  } catch (error) {
    __DEV__ && logger;
  }
};

export const ConsoleUtils = {
  l: (...args: any[]) => wrapper('log', ...args),
  le: (...args: any[]) => wrapper('logErr', ...args),
  w: (...args: any[]) => wrapper('warn', ...args),
  e: (...args: any[]) => wrapper('error', ...args),
};
