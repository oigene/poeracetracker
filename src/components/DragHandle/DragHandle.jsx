import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import './DragHandle.scss';

const useStyles = makeStyles(theme => ({
  dragHandle: {
    flexGrow: 1,
    padding: theme.spacing(1),
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  }
}));

const DragHandle = () => {
  const classes = useStyles();
  return (
    <div className={classes.dragHandle}>
      <i className="material-icons">drag_handle</i>
    </div>
  );
};

export default DragHandle;
