import { createActions, createActionType } from '../helper';

const prefix = 'PROMOTION';

const types = {
  getList: createActionType('getList', prefix),
  getDetail: createActionType('getDetail', prefix),
  createPromotion: createActionType('createPromotion', prefix),
  clearDetail: `${prefix}/CLEAR_DETAIL`,
};

const actions = {
  getList: createActions(types.getList),
  getDetail: createActions(types.getDetail),
  createPromotion: createActions(types.createPromotion),
  clearDetail: () => ({ type: types.clearDetail }),
};

export { types, actions };
