import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Icon, Tooltip } from '@material-ui/core';
import { openInstructorFile } from '../../actions/instructor.actions';

import './ControlPlane.scss';

const useStyles = makeStyles(theme => ({
  controlPlane: {
    height: 40,
    background: 'rgba(0, 0, 0, .5)'
  }
  // paddingFix: {
  //   padding: theme.spacing(1)
  // },
  // placeholder: {
  //   textAlign: 'center',
  //   color: theme.palette.text.hint
  // }
}));

const ControlPlane = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.controlPlane}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Tooltip title="Open instructor file">
        <IconButton
          onClick={() => {
            openInstructorFile();
          }}
        >
          <Icon>assignment</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Tracker">
        <Link to="/">
          <IconButton>
            <Icon>av_timer</Icon>
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Settings">
        <Link to="/settings">
          <IconButton>
            <Icon>settings_application</Icon>
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default ControlPlane;
