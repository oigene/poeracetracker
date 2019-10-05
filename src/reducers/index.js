import { combineReducers } from 'redux';
import raceEvents from './raceEvents.reducer';

const reducer = combineReducers({ raceEvents });

export default reducer;
