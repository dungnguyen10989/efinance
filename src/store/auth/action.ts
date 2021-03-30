import { createActions, createActionType } from '../helper';

const prefix = 'AUTH';

const types = {
  login: createActionType('login', prefix),
  getInfo: createActionType('getInfo', prefix),
  register: createActionType('register', prefix),
  verifyPsw: createActionType('verifyPassword', prefix),
};

const actions = {
  login: createActions(types.login),
  getInfo: createActions(types.getInfo),
  register: createActions(types.register),
  verifyPsw: createActions(types.verifyPsw),
};

export { types, actions };
