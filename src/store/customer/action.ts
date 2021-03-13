import { createActions, createActionType } from '../helper';

const prefix = 'CUSTOMER';

const types = {
  getList: createActionType('getList', prefix),
  getHistoryById: createActionType('getHistoryById', prefix),
};

const actions = {
  getList: createActions(types.getList),
  getHistoryById: createActions(types.getHistoryById),
};

export { types, actions };
