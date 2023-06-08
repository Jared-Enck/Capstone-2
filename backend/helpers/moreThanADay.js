const moment = require('moment');

const moreThanADay = (time) => {
  if (time === undefined) return false;
  const now = moment(moment().format());
  return now.diff(time, 'hours') >= 24;
};

module.exports = moreThanADay;