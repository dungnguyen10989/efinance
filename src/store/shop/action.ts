import { createActions, createActionType } from '../helper';

const prefix = 'SHOP';

const types = {
  getInfo: createActionType('getInfo', prefix),
};

const actions = {
  getInfo: createActions(types.getInfo),
};

export { types, actions };
