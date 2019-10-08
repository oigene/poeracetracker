import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dragHandle: {
    padding: '4px 4px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    '-webkit-app-region': 'drag'
  },
  icon: {
    opacity: 0.5
  }
}));

const DragHandle = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.dragHandle}
      display="flex"
      justifyContent="flex-end"
    >
      <Box pr={1}>
        <Icon className={classes.icon} fontSize="small">
          drag_handle
        </Icon>
      </Box>
      <Box>
        <Icon className={classes.icon} fontSize="small">
          close
        </Icon>
      </Box>
    </Box>
  );
};

export default DragHandle;
