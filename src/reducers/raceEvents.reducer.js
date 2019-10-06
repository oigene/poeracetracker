import produce from 'immer';

import { ADD_DATA, RESET_DATA } from '../actions/race.actions';

const initialState = {
  events: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_DATA:
        return initialState;
      case ADD_DATA:
        draft.events = [...state.events, action.event];
    }
  });
