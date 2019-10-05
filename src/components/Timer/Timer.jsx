import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { getFormattedTime } from '../../utils/timeUtils';
import './Timer.scss';

let timerInterval = null;

const Timer = (props, ref) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const refreshRate = 10;

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
    <div className="timer container-fluid">
      <div className="time row align-items-center justify-content-center">
        <span>{getFormattedTime(time, 'hh:mm:ss')}</span>
        <span className="ms">{getFormattedTime(time, 'SS')}</span>
      </div>
    </div>
  );
};

export default forwardRef(Timer);
