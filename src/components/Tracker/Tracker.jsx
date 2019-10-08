import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useIPCEventListener } from '../../hooks/useEventListener';
import constants from '../../common/constants';
import { processNewData, resetData } from '../../actions/race.actions';
import Timer from '../Timer/Timer';
import Display from '../Display/Display';

const useStyles = makeStyles(theme => ({
  tracker: {
    maxHeight: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: 40 + 56 // 40px = control panel, 56px = timer
  },
  placeholder: {
    textAlign: 'center',
    color: theme.palette.text.hint
  }
}));

export default function Tracker() {
  const [raceId, setRaceId] = useState(null);
  const events = useSelector(state => state.raceEvents.events);
  const timerRef = useRef();
  const dispatch = useDispatch();
  const classes = useStyles();

  const onClientDataReceived = (event, text) => {
    dispatch(
      processNewData({
        events,
        text,
        time: timerRef.current.time,
        raceId
      })
    );
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
  useIPCEventListener(constants.EVENT_TRACKER_START, onRaceStart);
  useIPCEventListener(constants.EVENT_TRACKER_PAUSE, onRacePause);
  useIPCEventListener(constants.EVENT_TRACKER_STOP, onRaceStop);

  return (
    <Box
      display="flex"
      flexGrow={1}
      alignItems={raceId ? 'flex-start' : 'center'}
      justifyContent={raceId ? 'flex-start' : 'center'}
      flexDirection="column"
      className={classes.tracker}
    >
      {raceId ? (
        <Display />
      ) : (
        <h3 className={classes.placeholder}>PRESS ALT+1 TO START</h3>
      )}
      <Timer ref={timerRef} />
    </Box>
  );
}
