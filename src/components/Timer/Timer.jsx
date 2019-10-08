import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { getFormattedTime } from '../../utils/timeUtils';

const useStyles = makeStyles(() => ({
  timer: {
    background: 'rgba(35, 38, 49, 0.6)',
    position: 'fixed',
    bottom: 40,
    left: 0,
    right: 0
  }
}));

let timerInterval = null;

const Timer = (props, ref) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const refreshRate = 10;
  const classes = useStyles();

  useImperativeHandle(ref, () => ({
    time,
    start: () => {
      if (!isRunning) {
        setIsRunning(true);

        timerInterval = setInterval(() => {
          setTime(prevTime => prevTime + refreshRate);
        }, refreshRate);
      }
    },
    stop: () => {
      setTime(0);
      setIsRunning(false);
      clearInterval(timerInterval);
    },
    pause: () => {
      setIsRunning(false);
      clearInterval(timerInterval);
    }
  }));

  return (
    <Box
      className={classes.timer}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={1}
      fontFamily="Roboto Mono"
      color="primary.main"
      fontWeight="fontWeightBold"
      letterSpacing={-1}
    >
      <Box fontSize={28} mr={1}>
        {getFormattedTime(time, 'hh:mm:ss')}
      </Box>
      <Box mt={1} fontSize={18}>
        {getFormattedTime(time, 'SS')}
      </Box>
    </Box>
  );
};

export default forwardRef(Timer);
