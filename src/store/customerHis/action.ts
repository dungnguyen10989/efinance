import { createActions, createActionType } from '../helper';

const prefix = 'CUSTOMER_HIS';

const types = {
  getList: createActionType('getList', prefix),
};

const actions = {
  getList: createActions(types.getList),
};

export { types, actions };
