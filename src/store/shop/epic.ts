import { of, from } from 'rxjs';
import { ActionsObservable, ofType, combineEpics } from 'redux-observable';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { IAction } from 'local-redux';
import { types, actions } from './action';
import { fetchAPI } from '@services';

const getInfoEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getInfo.start),
    switchMap((action) => {
      const { onSuccess, onError } = action;
      return from(fetchAPI('get/auth/app/shop/info', 'get')).pipe(
        switchMap((response) => {
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          return of(actions.getInfo.success(data));
        }),
        takeUntil(action$.pipe(ofType(types.getInfo.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.getInfo.error(error));
        }),
      );
    }),
  );
};

export default combineEpics(getInfoEpic);
