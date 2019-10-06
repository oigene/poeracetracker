import React from 'react';
import { Link } from 'react-router-dom';
import { openInstructorFile } from '../../actions/instructor.actions';

import './ControlPlane.scss';

const ControlPlane = () => {
  return (
    <div className="control-plane container-fluid">
      <div className="row align-items-center">
        <div className="col-4">
          <span className="logo">poeracetracker</span>
        </div>
        <div className="col text-right">
          <button
            title="load instructions"
            className="btn btn-outline-light x-settings"
            type="button"
            onClick={() => {
              openInstructorFile();
            }}
          >
            <i className="material-icons">assignment</i>
          </button>
          <Link
            title="race tracker (ALT+4)"
            className="btn btn-outline-light x-switch"
            to="/"
          >
            <i className="material-icons">av_timer</i>
          </Link>

          <Link
            title="settings"
            className="btn btn-outline-light x-settings"
            to="/settings"
          >
            <i className="material-icons">settings_application</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ControlPlane;
