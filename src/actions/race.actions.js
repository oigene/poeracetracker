import RaceEventModel from '../persistence/RaceEventModel';
import Database from '../persistence/Database';
import constants from '../common/constants';

const db = new Database(constants.COLLECTION_RACEEVENTS);

export const ADD_DATA = 'ADD_DATA';
export const RESET_DATA = 'RESET_DATA';
export const USELESS_DATA = 'USELESS_DATA';

export const processNewData = ({ events, text, time, raceId }) => {
  return async dispatch => {
    if (text.length > 0 && time > 0) {
      const event = {
        type: '',
        name: '',
        time,
        top: time,
        avg: time
      };

      if (
        text.indexOf('You have entered') > -1 &&
        text.indexOf('Hideout') === -1
      ) {
        const zone = text.match(/.*You have entered (.*)./)[1];
        // TODO: other checks for same zone names in different acts
        if (zone === 'The Twilight Strand' && text.indexOf('ac1') > -1) {
          return dispatch({ type: RESET_DATA });
        }

        event.type = constants.EVENTTYPE_ZONES;
        event.name = zone;
      } else if (text.indexOf('is now level') > -1) {
        event.type = constants.EVENTTYPE_LEVELS;
        event.name = text.match(/.*is now level (.*)/)[1];
      } else {
        return dispatch({ type: USELESS_DATA });
      }

      if (
        !events.find(ev => ev.type === event.type && ev.name === event.name)
      ) {
        const top = await db.getTopTime(event.type, event.name);
        const avg = await db.getAvgTime(event.type, event.name);

        event.top = top > 0 ? top : time;
        event.avg = avg > 0 ? avg : time;

        db.save(
          new RaceEventModel(raceId, event.type, event.name, time),
          (err, doc) => {
            console.log('### ERROR: ###');
            console.log(err);
            console.log('##############');
            console.log('### DOC: ###');
            console.log(doc);
            console.log('##############');
          }
        );

        return dispatch({
          type: ADD_DATA,
          event
        });
      }

      return dispatch({ type: USELESS_DATA });
    }

    return dispatch({ type: USELESS_DATA });
  };
};

export const resetData = () => {
  return { type: RESET_DATA };
};
