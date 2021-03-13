import { of, from } from 'rxjs';
import { ActionsObservable, ofType, combineEpics } from 'redux-observable';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { IAction } from 'local-redux';
import { types, actions } from './action';
import { fetchAPI } from '@services';

const createRedeemEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.createRedeem.start),
    switchMap((action) => {
      const { payload, onSuccess, onError } = action;
      return from(
        fetchAPI('set/app/save/product/usepoint', 'post', payload),
      ).pipe(
        switchMap((response) => {
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          return of(actions.createRedeem.success({ ...payload, ...data }));
        }),
        takeUntil(action$.pipe(ofType(types.createRedeem.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.createRedeem.error(error));
        }),
      );
    }),
  );
};

export default combineEpics(createRedeemEpic);
