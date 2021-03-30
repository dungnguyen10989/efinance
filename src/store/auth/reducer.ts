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
    case types.login.success:
    case types.getInfo.success:
    case types.register.success:
      return state.merge({ data: payload.user, error: undefined });
    case types.login.error:
      return state.merge({ data: undefined, error: payload });
    default:
      return state;
  }
};
