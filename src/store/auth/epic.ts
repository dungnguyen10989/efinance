import { of, from } from 'rxjs';
import { ActionsObservable, ofType, combineEpics } from 'redux-observable';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { IAction } from 'local-redux';
import { types, actions } from './action';
import { fetchAPI, updateLocalAuth } from '@services';
import { PopupManager } from '@utils';
import { valuesActions } from '@store/values';

const loginEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.login.start),
    switchMap((action) => {
      const { payload, onSuccess, onError } = action;
      PopupManager.showOverlay();
      const { username, password } = payload;
      return from(fetchAPI('auth/login', 'post', { username, password })).pipe(
        switchMap((response) => {
          PopupManager.dismissOverlay();
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          updateLocalAuth(data.user);
          return of(
            valuesActions.silentFetch.start(),
            actions.login.success(data),
          );
        }),
        takeUntil(action$.pipe(ofType(types.login.cancel))),
        catchError((error) => {
          PopupManager.dismissOverlay();
          onError(error);
          return of(actions.login.error(error));
        }),
      );
    }),
  );
};

const getInfoEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getInfo.start),
    switchMap((action) => {
      const { onSuccess, onError } = action;
      PopupManager.showOverlay();
      return from(fetchAPI('get/auth/app/userinfo', 'get')).pipe(
        switchMap((response) => {
          PopupManager.dismissOverlay();
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          updateLocalAuth(data.user);

          return of(
            valuesActions.silentFetch.start(),
            actions.getInfo.success(data),
          );
        }),
        takeUntil(action$.pipe(ofType(types.getInfo.cancel))),
        catchError((error) => {
          PopupManager.dismissOverlay();
          onError(error);
          return of(actions.getInfo.error(error));
        }),
      );
    }),
  );
};

const registerEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.register.start),
    switchMap((action) => {
      const { payload, onSuccess, onError } = action;
      PopupManager.showOverlay();
      return from(fetchAPI('auth/register', 'post', payload)).pipe(
        switchMap((response) => {
          PopupManager.dismissOverlay();
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          updateLocalAuth(data.user);
          return of(
            valuesActions.silentFetch.start(),
            actions.register.success(data),
          );
        }),
        takeUntil(action$.pipe(ofType(types.register.cancel))),
        catchError((error) => {
          PopupManager.dismissOverlay();
          onError(error);
          return of(actions.register.error(error));
        }),
      );
    }),
  );
};

export default combineEpics(loginEpic, getInfoEpic, registerEpic);
