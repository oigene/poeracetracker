import { combineReducers } from 'redux';
import raceEvents from './raceEvents.reducer';
import instructor from './instructor.reducer';

const reducer = combineReducers({ raceEvents, instructor });

export default reducer;
