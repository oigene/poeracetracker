import produce from 'immer';

import {
  INSTRUCTOR_FILE_LOADED,
  INSTRUCTOR_CLOSED
} from '../actions/instructor.actions';

const initialState = {
  instructions: {}
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INSTRUCTOR_FILE_LOADED:
        draft.instructions = action.data;
      case INSTRUCTOR_CLOSED:
        draft = initialState;
    }
  });
