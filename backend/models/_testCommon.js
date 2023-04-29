const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM game_collections");
  await db.query("DELETE FROM groups");
  await db.query("DELETE FROM users_groups");

  const usersRes = await db.query(`
    INSERT INTO users(
      username,
      password,
      email
    )
    VALUES ('u1', $1, 'u1@email.com'),
           ('u2', $2, 'u2@email.com'),
           ('u3', $3, 'u3@email.com')
    RETURNING id,username,email`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password3", BCRYPT_WORK_FACTOR)
    ]
  );
  
  const u1 = usersRes.rows[0];
  const u2 = usersRes.rows[1];
  const u3 = usersRes.rows[2];

  await db.query(`
    INSERT INTO game_collections
      (user_id, game_id)
    VALUES 
      ($1, 'e44jncYuUp'),
      ($2, '78ZDzlpvdb')
  `,[u1.id,u2.id]);
  
  const groupsRes = await db.query(`
    INSERT INTO groups
      (name,admin_user_id)
    VALUES
      ('group1',$1),
      ('group2',$2)
    RETURNING id
  `,[u1.id,u2.id]);
  
  const g1 = groupsRes.rows[0];
  const g2 = groupsRes.rows[1];

  await db.query(`
    INSERT INTO users_groups
      (group_id, user_id)
    VALUES
      ($1,$3),
      ($1,$4),
      ($2,$4)
  `,[g1.id,g2.id,u1.id,u2.id]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
};