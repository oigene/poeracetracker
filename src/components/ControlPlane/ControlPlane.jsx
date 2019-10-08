import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  IconButton,
  Icon,
  Tooltip,
  Typography
} from '@material-ui/core';
import { openInstructorFile } from '../../actions/instructor.actions';

import './ControlPlane.scss';

const useStyles = makeStyles(theme => ({
  controlPlane: {
    height: 40,
    background: 'rgba(0, 0, 0, .5)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  },
  iconLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  logo: {
    color: 'rgba(255, 255, 255, .4)',
    userSelect: 'none'
  }
}));

const ControlPlane = () => {
  const classes = useStyles();

  return (
    <Box className={classes.controlPlane} display="flex" alignItems="center">
      <Grid container>
        <Grid item xs>
          <Typography component="div">
            <Box
              pl={1}
              fontFamily="Raleway"
              fontWeight={600}
              className={classes.logo}
            >
              poeletics
            </Box>
          </Typography>
        </Grid>
        <Grid item xs align="right">
          <Box pr={1}>
            <Tooltip title="Open instructor file">
              <IconButton
                onClick={() => {
                  openInstructorFile();
                }}
                size="small"
              >
                <Icon fontSize="inherit">assignment</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Tracker">
              <Link className={classes.iconLink} to="/">
                <IconButton size="small">
                  <Icon fontSize="inherit">av_timer</Icon>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Settings">
              <Link className={classes.iconLink} to="/settings">
                <IconButton size="small">
                  <Icon fontSize="inherit">settings_application</Icon>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlPlane;
