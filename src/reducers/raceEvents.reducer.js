import produce from 'immer';

import { ADD_DATA, RESET_DATA } from '../actions/race.actions';

const initialState = {
  zones: {},
  levels: {}
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_DATA:
        return initialState;
      case ADD_DATA:
        const dataType = Object.keys(action.data)[0];

        draft[dataType] = { ...draft[dataType], ...action.data[dataType] };
    }
  });
