// Format sql for adding multiple users to group
function addUsersSql(usersLength) {
  const groupIDVarIdx = '$' + (usersLength + 1);
  const sqlVals = [];

  for (let i = 0; i < usersLength; i++) {
    sqlVals.push(`(${groupIDVarIdx}, $${i + 1})`);
  }

  return { sqlVals };
}

module.exports = addUsersSql;
