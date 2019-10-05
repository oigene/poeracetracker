import React from 'react';
import { getMockEntry } from '../../common/mocker';

import './ControlPlane.scss';

export default function ControlPlane({ createEntry }) {
  return (
    <div className="control-plane container-fluid">
      <div className="row align-items-center">
        <div className="col-4">
          <span
            className="logo"
            onClick={() => {
              createEntry(getMockEntry());
            }}
          >
            poeracetracker
          </span>
        </div>
        <div className="col text-right">
          <button
            title="click to drag window"
            type="button"
            className="btn btn-outline-light x-drag"
          >
            <i className="material-icons">drag_handle</i>
          </button>
          <button
            title="switch view (ALT+4)"
            type="button"
            className="btn btn-outline-light x-switch"
          >
            <i className="material-icons">compare_arrows</i>
          </button>
          <button
            title="settings"
            type="button"
            className="btn btn-outline-light x-settings"
          >
            <i className="material-icons">settings_application</i>
          </button>
          <button
            title="exit app"
            type="button"
            className="btn btn-outline-light x-close"
          >
            <i className="material-icons">power_settings_new</i>
          </button>
        </div>
      </div>
    </div>
  );
}
