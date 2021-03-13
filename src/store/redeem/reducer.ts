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

export default (state = initialState, action: IAction) => {
  const { type, payload = {} } = action;

  switch (type) {
    // case types.getList.success:
    //   const newData =
    //     !page || page === 1
    //       ? data
    //       : ArrayPrototype.standardizedByUnique(
    //           state.data.asMutable().concat(data),
    //         );
    //   return state.merge({ data: newData, error: undefined });
    // case types.getList.error:
    //   return state.merge({ data: [], error: payload });
    // case types.getDetail.success:
    //   return state.merge({ detail: payload });
    // case types.clearDetail:
    //   return state.merge({ detail: undefined });
    // case types.createPromotion.success:
    //   return state.merge({
    //     detail: payload,
    //     data: handleCreateProduct(payload, state),
    //   });
    default:
      return state;
  }
};
