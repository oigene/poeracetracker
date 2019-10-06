import RaceEventModel from '../persistence/RaceEventModel';
import Database from '../persistence/Database';
import constants from '../common/constants';

const db = new Database(constants.COLLECTION_RACEEVENTS);

export const ADD_DATA = 'ADD_DATA';
export const RESET_DATA = 'RESET_DATA';
export const USELESS_DATA = 'USELESS_DATA';

export const processNewData = ({
  currentZones,
  text,
  time,
  raceId,
  eventId,
  lastEventId
}) => {
  return async dispatch => {
    if (text.length > 0 && time > 0) {
      const data = {};
      let eventType;
      let eventName;

      if (
        text.indexOf('You have entered') > -1 &&
        text.indexOf('Hideout') === -1
      ) {
        const zone = text.match(/.*You have entered (.*)./)[1];

        if (zone === 'The Twilight Strand' && text.indexOf('ac1') > -1) {
          return dispatch({ type: RESET_DATA });
        }

        if (!Object.hasOwnProperty.call(currentZones, zone)) {
          eventType = constants.EVENTTYPE_ZONES;
          eventName = zone;

          const top = await db.getTopTime(eventType, eventName);
          const avg = await db.getAvgTime(eventType, eventName);

          data.zones = {
            [zone]: {
              time,
              top: top > 0 ? top : time,
              avg: avg > 0 ? avg : time
            }
          };
        }
      }

      if (text.indexOf('is now level') > -1) {
        const level = text.match(/.*is now level (.*)/)[1];

        eventType = constants.EVENTTYPE_LEVELS;
        eventName = level;

        const top = await db.getTopTime(eventType, eventName);
        const avg = await db.getAvgTime(eventType, eventName);

        data.levels = {
          [level]: {
            time,
            top: top > 0 ? top : time,
            avg: avg > 0 ? avg : time
          }
        };
      }

      if (Object.keys(data).length === 0) {
        return dispatch({ type: USELESS_DATA });
      }

      db.save(
        new RaceEventModel(
          raceId,
          eventType,
          eventName,
          time,
          eventId,
          lastEventId
        ),
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
        data
      });
    }

    return dispatch({ type: USELESS_DATA });
  };
};

export const resetData = () => {
  return { type: RESET_DATA };
};
