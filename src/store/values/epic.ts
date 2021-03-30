import { of, from } from 'rxjs';
import { ActionsObservable, ofType, combineEpics } from 'redux-observable';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { IAction } from 'local-redux';
import { types, actions } from './action';
import { fetchAPI } from '@services';

const silentFetchEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.silentFetch.start),
    switchMap((action) => {
      const promises = Promise.all([
        fetchAPI('get/auth/app/unit', 'get'),
        fetchAPI('get/auth/app/shop/branch', 'get'),
        fetchAPI('get/auth/app/shop/qrcode', 'get'),
      ]);

      return from(promises).pipe(
        switchMap((response) => {
          let units = response[0].data?.units;
          units = Array.isArray(units) ? units : [];
          let branches = response[1].data?.branch;
          branches = Array.isArray(branches) ? branches : [];
          const qr = response[2].data?.qrcode || '';
          const jobs = { units, branches, qr };

          return of(actions.silentFetch.success(jobs));
        }),
        takeUntil(action$.pipe(ofType(types.silentFetch.cancel))),
        catchError((error) => {
          return of(actions.silentFetch.error(error));
        }),
      );
    }),
  );
};

const getUnitsEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getUnit.start),
    switchMap((action) => {
      const { onSuccess, onError } = action;
      return from(fetchAPI('get/auth/app/unit', 'get')).pipe(
        switchMap((response) => {
          const { data, error } = response;
          if (error) {
            throw error;
          }
          let { units } = data;
          units = Array.isArray(units) ? units : [];
          onSuccess(units);
          return of(actions.getUnit.success(units));
        }),
        takeUntil(action$.pipe(ofType(types.getUnit.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.getUnit.error(error));
        }),
      );
    }),
  );
};

const getBranchesEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getBranch.start),
    switchMap((action) => {
      const { onSuccess, onError } = action;
      return from(fetchAPI('get/auth/app/shop/branch', 'get')).pipe(
        switchMap((response) => {
          const { data, error } = response;
          if (error) {
            throw error;
          }
          let { branch } = data;
          branch = Array.isArray(branch) ? branch : [];
          onSuccess(branch);
          return of(actions.getBranch.success(branch));
        }),
        takeUntil(action$.pipe(ofType(types.getBranch.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.getBranch.error(error));
        }),
      );
    }),
  );
};

const getQrEpic = (action$: ActionsObservable<IAction>) => {
  return action$.pipe(
    ofType(types.getQr.start),
    switchMap((action) => {
      const { onSuccess, onError } = action;
      return from(fetchAPI('get/auth/app/shop/qr', 'get')).pipe(
        switchMap((response) => {
          const { data, error } = response;
          if (error) {
            throw error;
          }
          onSuccess(data.qrcode || '');
          return of(actions.getQr.success(data.qrcode || ''));
        }),
        takeUntil(action$.pipe(ofType(types.getQr.cancel))),
        catchError((error) => {
          onError(error);
          return of(actions.getQr.error(error));
        }),
      );
    }),
  );
};

export default combineEpics(
  silentFetchEpic,
  getUnitsEpic,
  getBranchesEpic,
  getQrEpic,
);
