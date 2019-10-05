import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DragHandle from '../DragHandle/DragHandle';
import Tracker from '../Tracker/Tracker';
import Settings from '../Settings/Settings';
import ControlPlane from '../ControlPlane/ControlPlane';

import 'bootstrap/scss/bootstrap.scss';
import '../../scss/styles.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <DragHandle />
      <Switch>
        <Route exact path="/">
          <Tracker />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
      <ControlPlane />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
