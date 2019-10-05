import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';
import { useIPCEventListener } from '../../hooks/useEventListener';
import constants from '../../common/constants';
import { processNewData, resetData } from '../../actions/race.actions';
import Timer from '../Timer/Timer';
import Display from '../Display/Display';
import ControlPlane from '../ControlPlane/ControlPlane';

import './Tracker.scss';

export default function Tracker() {
  const [raceId, setRaceId] = useState(null);
  const [lastEventId, setLastEventId] = useState('');
  const currentZones = useSelector(state => state.raceEvents.zones);
  const timerRef = useRef();
  const dispatch = useDispatch();

  const onClientDataReceived = text => {
    const eventId = uuid();

    dispatch(
      processNewData({
        currentZones,
        text,
        time: timerRef.current.time,
        raceId,
        eventId,
        lastEventId
      })
    );

    setLastEventId(eventId);
  };

  const onRaceStart = () => {
    if (raceId == null) {
      setRaceId(uuid());
    }
    timerRef.current.start();
  };

  const onRacePause = () => {
    timerRef.current.pause();
  };

  const onRaceStop = () => {
    timerRef.current.stop();
    setRaceId(null);
    dispatch(resetData());
  };

  useIPCEventListener(constants.EVENT_NEW_DATA, onClientDataReceived);
  useIPCEventListener(constants.EVENT_START, onRaceStart);
  useIPCEventListener(constants.EVENT_PAUSE, onRacePause);
  useIPCEventListener(constants.EVENT_STOP, onRaceStop);

  return (
    <div className="tracker">
      <Display />
      <Timer ref={timerRef} />
    </div>
  );
}
