import moment from 'moment';

export function getFormattedTime(time, format) {
  // normalize time to ignore ms
  const duration = moment.duration(time);
  const hours = Math.floor(duration.asHours())
    .toString()
    .padStart(2, '0');
  const minutes = moment.utc(duration.asMilliseconds()).format('mm');
  const seconds = moment.utc(duration.asMilliseconds()).format('ss');
  const deciseconds = moment.utc(duration.asMilliseconds()).format('SS');

  return format
    .replace(/hh/, hours)
    .replace(/mm/, minutes)
    .replace(/ss/, seconds)
    .replace(/SS/, deciseconds);
}

export function getFormattedDiffTime(time1, time2) {
  // normalize time to ignore ms, otherwise u could have a diff of 2 sec on display but show (+1)
  const normalizedTime1 = Math.floor(time1 / 1000) * 1000;
  const normalizedTime2 = Math.floor(time2 / 1000) * 1000;
  const duration = moment.duration(Math.abs(normalizedTime1 - normalizedTime2));
  let diffTime = normalizedTime1 < normalizedTime2 ? '+' : '-';
  diffTime = normalizedTime1 === normalizedTime2 ? '' : diffTime; // otherwise -00:00

  if (duration.asMinutes() >= 60) {
    diffTime += getFormattedTime(duration, 'hh:mm:ss');
  } else {
    diffTime += getFormattedTime(duration, 'mm:ss');
  }

  return diffTime;
}

export function getDiffTimePercent(time1, time2) {
  // normalize time to ignore ms
  const normalizedTime1 = Math.floor(time1 / 1000) * 1000;
  const normalizedTime2 = Math.floor(time2 / 1000) * 1000;

  return (
    Math.round(
      ((normalizedTime2 - normalizedTime1) / normalizedTime1) * 100 * 100
    ) / 100
  );
}
