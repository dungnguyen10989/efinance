import { createActions, createActionType } from '../helper';

const prefix = 'REDEEM';

const types = {
  createRedeem: createActionType('createRedeem', prefix),
};

const actions = {
  createRedeem: createActions(types.createRedeem),
};

export { types, actions };
