const { BadRequestError } = require("../expressError");

/** Sets up data values to update 
 * Returns {setCols (column names converted), values}
 */

function sqlForPartialUpdate(dataToUpdate) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  const cols = keys.map((colName, idx) =>
      `"${colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };