import { ArrayPrototype } from '@utils';
import { IAction } from 'local-redux';
import Immutable from 'seamless-immutable';
import { types } from './action';

interface State {
  data: Array<any>;
  error?: any;
}

const initialState = Immutable<State>({
  data: [],
  error: undefined,
});

export default (state = initialState, action: IAction) => {
  const { type, payload = {} } = action;
  const { page, histories } = payload;

  switch (type) {
    case types.getList.success:
      const newData =
        !page || page === 1
          ? histories
          : ArrayPrototype.standardizedByUnique(
              state.data.asMutable().concat(histories),
              'product_id',
            );
      return state.merge({ data: newData, error: undefined });
    case types.getList.error:
      return state.merge({ data: [], error: payload });
    default:
      return state;
  }
};
