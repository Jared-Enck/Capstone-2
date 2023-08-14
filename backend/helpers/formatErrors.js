/** Format error messages
 *
 * @param {*} messages
 * @returns {*} { [path]: message, ... }
 *
 * if multiple errors thrown, map errors and set errs object to
 *  { [m.path]: message }
 */

function formatErrors(messages) {
  let errs;
  if (typeof messages === 'object') {
    errs = {};
    [...messages].map((m) => {
      if (m.path.length) {
        const firstLetter = m.message[0].toUpperCase();
        const message = firstLetter.concat(m.message.slice(1));
        if (!errs[m.path]) errs[m.path] = message;
      } else {
        if (!errs[m.argument]) errs[m.argument] = m.message;
      }
    });
  } else {
    errs = messages;
  }
  return errs;
}

module.exports = formatErrors;
