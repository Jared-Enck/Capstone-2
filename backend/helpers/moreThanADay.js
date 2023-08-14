const moment = require('moment');

// check if difference between now and time is greater than 24 hours
const moreThanADay = (time) => {
  if (time === undefined) return false;
  const now = moment(moment().format());
  return now.diff(time, 'hours') >= 24;
};

module.exports = moreThanADay;
