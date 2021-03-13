import { of, from } from 'rxjs';
import { ActionsObservable, ofType, combineEpics } from 'redux-observable';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { IAction } from 'local-redux';
import { types, actions } from './action';
import { fetchAPI } from '@services';

const getListEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getList.start),
    switchMap((action) => {
      const { payload = {}, onSuccess, onError } = action;
      const { id } = payload;
      return from(fetchAPI(`get/auth/app/customer/${id}`, 'get', payload)).pipe(
        switchMap((response) => {
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          return of(actions.getList.success({ ...payload, ...data }));
        }),
        takeUntil(action$.pipe(ofType(types.getList.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.getList.error(error));
        }),
      );
    }),
  );
};

export default combineEpics(getListEpic);
