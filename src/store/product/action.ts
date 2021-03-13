import { createActions, createActionType } from '../helper';

const prefix = 'PRODUCT';

const types = {
  getList: createActionType('getList', prefix),
  getDetail: createActionType('getDetail', prefix),
  createProduct: createActionType('createProduct', prefix),
  clearDetail: `${prefix}/CLEAR_DETAIL`,
};

const actions = {
  getList: createActions(types.getList),
  getDetail: createActions(types.getDetail),
  createProduct: createActions(types.createProduct),
  clearDetail: () => ({ type: types.clearDetail }),
};

export { types, actions };
