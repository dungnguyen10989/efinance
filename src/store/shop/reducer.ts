import { IAction } from 'local-redux';
import Immutable from 'seamless-immutable';
import { types } from './action';

interface State {
  data?: any;
  error?: any;
}

const initialState = Immutable<State>({
  data: undefined,
  error: undefined,
});

export default (state = initialState, action: IAction) => {
  const { type, payload = {} } = action;
  switch (type) {
    case types.getInfo.success:
      return state.merge({ data: payload, error: undefined });
    case types.getInfo.error:
      return state.merge({ data: undefined, error: payload });
    default:
      return state;
  }
};
