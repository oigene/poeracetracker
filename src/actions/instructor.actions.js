import { ipcRenderer } from 'electron';
import constants from '../common/constants';

export const INSTRUCTOR_FILE_LOADED = 'INSTRUCTOR_FILE_LOADED';
export const INSTRUCTOR_CLOSED = 'INSTRUCTOR_CLOSED';

export const openInstructor = instructions => {
  ipcRenderer.send(constants.EVENT_INSTRUCTOR_OPEN_VIEW, instructions);
};

export const closeInstructor = () => {
  return { type: INSTRUCTOR_CLOSED };
};

export const openInstructorFile = () => {
  const fileData = ipcRenderer.sendSync(constants.EVENT_INSTRUCTOR_OPEN_FILE);

  openInstructor(fileData);

  return {
    type: INSTRUCTOR_FILE_LOADED,
    data: fileData
  };
};
