import React from 'react';
import { Link } from 'react-router-dom';

import './ControlPlane.scss';

const ControlPlane = () => {
  return (
    <div className="control-plane container-fluid">
      <div className="row align-items-center">
        <div className="col-4">
          <span className="logo">poeracetracker</span>
        </div>
        <div className="col text-right">
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
