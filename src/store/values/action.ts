import { createActions, createActionType } from '../helper';

const prefix = 'VALUES';

const types = {
  silentFetch: createActionType('silentFetch', prefix),
  getUnit: createActionType('getUnit', prefix),
  getBranch: createActionType('getBranch', prefix),
  getQr: createActionType('getQr', prefix),
};

const actions = {
  silentFetch: createActions(types.silentFetch),
  getUnit: createActions(types.getUnit),
  getBranch: createActions(types.getBranch),
  getQr: createActions(types.getQr),
};

export { types, actions };
