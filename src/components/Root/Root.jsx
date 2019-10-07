import { remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import DragHandle from '../DragHandle/DragHandle';
import Tracker from '../Tracker/Tracker';
import Settings from '../Settings/Settings';
import ControlPlane from '../ControlPlane/ControlPlane';
import Instructor from '../Instructor/Instructor';

import '../../scss/styles.scss';
import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-roboto/index.css';
import 'typeface-roboto-mono/index.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

// check window id
const isInstructorWindow =
  remote.getGlobal('instructorWindow') &&
  remote.getGlobal('instructorWindow').id === remote.getCurrentWindow().id;

const Root = ({ store }) => {
  if (isInstructorWindow) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <DragHandle />
            <Instructor />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <DragHandle />
            <Switch>
              <Route exact path="/">
                <Tracker />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/instructor">
                <Instructor />
              </Route>
            </Switch>
            <ControlPlane />
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
