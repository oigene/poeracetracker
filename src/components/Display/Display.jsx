import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, IconButton, Icon, Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  getFormattedTime,
  getFormattedDiffTime,
  getDiffTimePercent
} from '../../utils/timeUtils';

const useStyles = makeStyles(theme => ({
  display: {
    padding: theme.spacing(1),
    width: '100%',
    userSelect: 'none'
  },
  deleteBtn: {
    top: -1
  },
  deleteBtnIcon: {
    fontSize: '1rem'
  },
  scoreYellow: {
    color: theme.colors.yellow
  },
  scoreRed: {
    color: theme.colors.red
  },
  scoreGreen: {
    color: theme.colors.green
  }
}));

const Display = ({ events }) => {
  const scrollBar = React.createRef();
  const classes = useStyles();

  const createMarkup = () => {
    return events
      .map(event => {
        const { time, top, avg } = event;
        const diffTop = getFormattedDiffTime(top, time);
        const diffAvg = getFormattedDiffTime(avg, time);
        const percentTop = getDiffTimePercent(top, time);
        const percentAvg = getDiffTimePercent(avg, time);

        let topClass = classes.scoreYellow;
        if (percentTop > 10) {
          topClass = classes.scoreRed;
        } else if (percentTop < 0) {
          topClass = classes.scoreGreen;
        }

        let avgClass = classes.scoreYellow;
        if (percentAvg > 10) {
          avgClass = classes.scoreRed;
        } else if (percentAvg < 0) {
          avgClass = classes.scoreGreen;
        }

        return (
          <Grid item xs={12} key={time}>
            <Typography noWrap component="div">
              <Box fontSize={14}>
                <Box
                  mr={1}
                  component="span"
                  fontFamily="Roboto Mono"
                  fontWeight={600}
                  letterSpacing={-1}
                >
                  {getFormattedTime(time, 'hh:mm:ss')}
                </Box>
                <Box mr={1} component="span">
                  {`${event.type === 'levels' ? 'Level ' : ''}${event.name}`}
                </Box>
                <IconButton size="small" className={classes.deleteBtn}>
                  <Icon className={classes.deleteBtnIcon}>highlight_off</Icon>
                </IconButton>
              </Box>
            </Typography>
            <Typography component="div" color="textSecondary">
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box
                    mr={1}
                    fontFamily="Roboto Mono"
                    fontWeight={600}
                    letterSpacing={-1}
                    fontSize={12}
                  >
                    {`Top: ${getFormattedTime(top, 'hh:mm:ss')}`}
                    <Box mr={1} component="span" className={topClass}>
                      {` ${diffTop} ${percentTop > 0 ? '+' : ''}${percentTop}%`}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    mr={1}
                    fontFamily="Roboto Mono"
                    fontWeight={600}
                    lineHeight="1rem"
                    letterSpacing={-1}
                    fontSize={12}
                  >
                    {`Avg: ${getFormattedTime(avg, 'hh:mm:ss')}`}
                    <Box mr={1} component="span" className={avgClass}>
                      {` ${diffAvg} ${percentAvg > 0 ? '+' : ''}${percentAvg}%`}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        );
      })
      .reverse();
  };

  return (
    <PerfectScrollbar className={classes.display} ref={scrollBar}>
      <Grid container spacing={1}>
        {createMarkup()}
      </Grid>
    </PerfectScrollbar>
  );
};

const mapStateToProps = state => ({ events: state.raceEvents.events });

export default connect(mapStateToProps)(Display);
