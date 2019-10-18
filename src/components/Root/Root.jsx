import { remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import DragHandle from '../DragHandle/DragHandle';
import Tracker from '../Tracker/Tracker';
import Settings from '../Settings/Settings';
import ControlPlane from '../ControlPlane/ControlPlane';
import Instructor from '../Instructor/Instructor';

import 'material-design-icons/iconfont/material-icons.css';
import 'typeface-roboto';
import 'typeface-roboto-mono';
import 'typeface-raleway';
import 'react-perfect-scrollbar/dist/css/styles.css';

const useStyles = makeStyles({
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%'
    },
    '#root': {
      height: '100%',
      display: 'flex',
      'flex-direction': 'column'
    }
  }
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#99e6ff',
      main: '#62b4f4',
      dark: '#1e85c1'
    }
  },
  typography: {},
  colors: {
    yellow: '#fdd835',
    red: '#ef5350',
    green: '#00c853'
  }
});

// check window id
const isInstructorWindow =
  remote.getGlobal('instructorWindow') &&
  remote.getGlobal('instructorWindow').id === remote.getCurrentWindow().id;

const Root = ({ store }) => {
  useStyles();

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
    <Provider className="aasd-class" store={store}>
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
