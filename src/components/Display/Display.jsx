import React from 'react';
import { connect } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
import './Display.scss';
import {
  getFormattedTime,
  getFormattedDiffTime,
  getDiffTimePercent
} from '../../utils/timeUtils';

const Display = ({ events }) => {
  const scrollBar = React.createRef();

  const createMarkup = () => {
    return events
      .map(event => {
        const { time, top, avg } = event;
        const diffTop = getFormattedDiffTime(top, time);
        const diffAvg = getFormattedDiffTime(avg, time);
        const percentTop = getDiffTimePercent(top, time);
        const percentAvg = getDiffTimePercent(avg, time);

        let topClassSuffix = 'yellow';
        if (percentTop > 0) {
          topClassSuffix = 'red';
        } else if (percentTop < 10) {
          topClassSuffix = 'green';
        }

        let avgClassSuffix = 'yellow';
        if (percentAvg > 0) {
          avgClassSuffix = 'red';
        } else if (percentAvg < -10) {
          avgClassSuffix = 'green';
        }

        return (
          <div className="row" key={time}>
            <div className="main-data col-12">
              <span className="time">{getFormattedTime(time, 'hh:mm:ss')}</span>
              {`${event.type === 'levels' ? 'Level ' : ''}${event.name}`}
            </div>
            <div className="additional-data col-12">
              {`Top: ${getFormattedTime(top, 'hh:mm:ss')}`}
              <span className={`score score-${topClassSuffix}`}>
                {` ${diffTop} ${percentTop > 0 ? '+' : ''}${percentTop}%`}
              </span>{' '}
            </div>
            <div className="additional-data col-12">
              {`Avg: ${getFormattedTime(avg, 'hh:mm:ss')}`}
              <span className={`score score-${avgClassSuffix}`}>
                {` ${diffAvg} ${percentAvg > 0 ? '+' : ''}${percentAvg}%`}
              </span>{' '}
            </div>
          </div>
        );
      })
      .reverse();
  };

  return (
    <PerfectScrollbar className="display container-fluid" ref={scrollBar}>
      {createMarkup()}
    </PerfectScrollbar>
  );
};

const mapStateToProps = state => ({ events: state.raceEvents.events });

export default connect(mapStateToProps)(Display);
