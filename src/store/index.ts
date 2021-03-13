import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import { useDispatch } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Reactotron } from '../../reactotron';

import { authEpic, authReducer } from './auth';
import { valuesEpic, valuesReducer } from './values';
import { shopEpic, shopReducer } from './shop';
import { customerEpic, customerReducer } from './customer';
import { customerHisEpic, customerHisReducer } from './customerHis';
import { productEpic, productReducer } from './product';
import { promotionEpic, promotionReducer } from './promotion';
import { redeemEpic, redeemReducer } from './redeem';

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  authEpic,
  customerEpic,
  customerHisEpic,
  productEpic,
  promotionEpic,
  shopEpic,
  valuesEpic,
  redeemEpic,
) as any;

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  customerHis: customerHisReducer,
  product: productReducer,
  promotion: promotionReducer,
  shop: shopReducer,
  values: valuesReducer,
  redeem: redeemReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
    (Reactotron as any).createEnhancer(),
  ),
);

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
