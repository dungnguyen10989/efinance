import { IAction } from 'local-redux';
import Immutable from 'seamless-immutable';
import { types } from './action';

interface State {
  units: Array<any>;
  branches: Array<any>;
  qr: string;
}

const initialState = Immutable<State>({
  units: [],
  branches: [],
  qr: '',
});

export default (state = initialState, action: IAction) => {
  const { type, payload = {} } = action;
  switch (type) {
    case types.silentFetch.success:
      return state.merge(payload);
    case types.getUnit.success:
      return state.merge({ units: payload });
    case types.getBranch.success:
      return state.merge({ branches: payload });
    case types.getQr.success:
      return state.merge({ qr: payload });
    default:
      return state;
  }
};
