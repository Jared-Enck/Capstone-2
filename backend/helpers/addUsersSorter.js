function addUsersSorter(users) {
  const groupIDVarIdx = "$" + (users.length + 1);
  const sqlVals = [];
  const userIDs = [];
  const usernames = [];

  users.map((u,idx) => {
    sqlVals.push(`(${groupIDVarIdx}, $${idx + 1})`);
    userIDs.push(u.id);
    usernames.push(u.username);
  });
  
  return { sqlVals, userIDs, usernames};
}

module.exports = addUsersSorter;