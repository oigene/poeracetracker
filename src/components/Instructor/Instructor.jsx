import React, { useState } from 'react';
import { useIPCEventListener } from '../../hooks/useEventListener';
import constants from '../../common/constants';
import './Instructor.scss';

const Instructor = () => {
  const [instructions, setInstructions] = useState({});

  const onUpdateView = (event, data) => {
    setInstructions(data);
  };

  useIPCEventListener(constants.EVENT_INSTRUCTOR_UPDATE_VIEW, onUpdateView);

  return (
    <div className="instructor">
      <div className="instruction">Instruction</div>
    </div>
  );
};

export default Instructor;
