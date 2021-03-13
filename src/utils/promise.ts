export interface CancelablePromise<T = {}> extends Promise<T> {
  cancel: () => void;
}

export const makeCancelablePromise = <T = {}>(promise: Promise<T>) => {
  let rejectFn: any;

  const wrappedPromise = new Promise((resolve, reject) => {
    rejectFn = reject;
    Promise.resolve(promise).then(resolve).catch(reject);
  }) as CancelablePromise<T>;

  wrappedPromise.cancel = () => {
    if (rejectFn) {
      rejectFn({ cancelled: true });
    }
  };
  return wrappedPromise;
};
