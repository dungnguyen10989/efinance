import {of, from} from 'rxjs';
import {ActionsObservable, ofType, combineEpics} from 'redux-observable';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {IAction} from 'local-redux';
import {types, actions} from './action';
import {fetchAPI} from '@services';
import {PopupManager} from '@utils';

const getListEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getList.start),
    switchMap((action) => {
      const {payload, onSuccess, onError} = action;
      return from(fetchAPI('get/auth/app/shop/product', 'get', payload)).pipe(
        switchMap((response) => {
          const {data, error} = response;
          if (error) {
            throw error;
          }
          onSuccess(data);
          return of(actions.getList.success({...payload, ...data}));
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

const getDetailEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getDetail.start),
    switchMap((action) => {
      const {payload, onSuccess, onError} = action;
      return from(fetchAPI(`get/auth/app/product/${payload}`, 'get')).pipe(
        switchMap((response) => {
          const {data, error} = response;
          if (error) {
            throw error;
          }
          onSuccess(data.product);
          return of(actions.getDetail.success(data.product));
        }),
        takeUntil(action$.pipe(ofType(types.getDetail.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.getDetail.error(error));
        }),
      );
    }),
  );
};

const createProductEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.createProduct.start),
    switchMap((action) => {
      const {payload, onSuccess, onError} = action;
      PopupManager.showOverlay();
      return from(fetchAPI('set/app/save/product', 'post', payload)).pipe(
        switchMap((response) => {
          PopupManager.dismissOverlay();
          const {data, error} = response;
          if (error) {
            throw error;
          }
          const result = {
            type: payload.id ? 'update' : 'create',
            data: data.product,
          };
          onSuccess(result);
          return of(actions.createProduct.success(result));
        }),
        takeUntil(action$.pipe(ofType(types.createProduct.cancel))),
        catchError((error) => {
          PopupManager.dismissOverlay();
          onError(error);
          return of(actions.createProduct.error(error));
        }),
      );
    }),
  );
};

export default combineEpics(getListEpic, getDetailEpic, createProductEpic);
