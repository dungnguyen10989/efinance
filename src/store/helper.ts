import { IAction } from 'local-redux';

export enum ActionStatus {
  start = '@@FETCH-START@@',
  error = '@@FETCH-ERROR@@',
  success = '@@FETCH-SUCCESS@@',
  cancel = '@@FETCH-CANCEL@@',
}

export type ActionTypes = ReturnType<typeof createActionType>;

const defaultFunc = function (): void {};

/**
 * @description Create an action type set
 * @param type Actions type, should be prefixed with a difference prefix to avoid creating the same output type
 * @returns Actions object with 4 statuses
 * @example :
 * const prefix = 'AUTH/';
 * const login = `${prefix}LOGIN`
 * const loginTypes = createActionType(login)
 */
export const createActionType = (type: string, prefix = '') => ({
  start: `${ActionStatus.start}${prefix}/${type.toUpperCase()}`,
  success: `${ActionStatus.success}${prefix}/${type.toUpperCase()}`,
  error: `${ActionStatus.error}${prefix}/${type.toUpperCase()}`,
  cancel: `${ActionStatus.cancel}${prefix}/${type.toUpperCase()}`,
});

/**
 * @description Re-modify payload, success callback and error callback to reduce the case of validate them on middleware and create a new action instance
 * @param type action type
 * @param P Type of input payload of startAction
 * @param R Type of output response, like DTO
 */
export const createAction = <P = {}, R = {}>(type: string) => (
  _payload?: P,
  _onSuccess?: (data?: R) => void,
  _onError?: (error?: any) => void,
): IAction<P> => {
  const payload = _payload || {};

  const onSuccess = typeof _onSuccess === 'function' ? _onSuccess : defaultFunc;
  const onError = typeof _onError === 'function' ? _onError : defaultFunc;

  return {
    type,
    payload,
    onSuccess,
    onError,
  };
};

/**
 * @description Create an action set corresponding to the actionTypes set created above
 */
export const createActions = <P = {}, R = {}>(types: ActionTypes) => {
  return {
    start: createAction<P, R>(types.start),
    success: createAction<R>(types.success),
    error: createAction(types.error),
    cancel: createAction(types.cancel),
  };
};
