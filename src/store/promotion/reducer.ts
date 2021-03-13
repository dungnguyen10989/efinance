import { ArrayPrototype } from '@utils';
import { IAction } from 'local-redux';
import Immutable from 'seamless-immutable';
import { types } from './action';

interface State {
  data: Array<any>;
  detail?: any;
  error?: any;
}

const initialState = Immutable<State>({
  data: [],
  error: undefined,
});

const handleCreateProduct = (payload: any, state: any) => {
  const clone = [...state.data];
  const { type, data } = payload;
  const index = clone.findIndex((item: any) => item.id === data.id);
  if (type === 'create') {
    clone.unshift(data);
  } else if (index > -1) {
    clone[index] = data;
  }
  return clone;
};

export default (state = initialState, action: IAction) => {
  const { type, payload = {} } = action;
  const { page, promotions = {} } = payload;
  const { data } = promotions;

  switch (type) {
    case types.getList.success:
      const newData =
        !page || page === 1
          ? data
          : ArrayPrototype.standardizedByUnique(
              state.data.asMutable().concat(data),
            );
      return state.merge({ data: newData, error: undefined });
    case types.getList.error:
      return state.merge({ data: [], error: payload });
    case types.getDetail.success:
      return state.merge({ detail: payload });
    case types.clearDetail:
      return state.merge({ detail: undefined });
    case types.createPromotion.success:
      return state.merge({
        detail: payload,
        data: handleCreateProduct(payload, state),
      });
    default:
      return state;
  }
};
