const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM game_collections");

  await db.query(`
        INSERT INTO users(id,
                          username,
                          password,
                          email)
        VALUES (1,'u1', $1, 'u1@email.com'),
               (2,'u2', $2, 'u2@email.com'),
               (3,'u3', $3, 'u3@email.com')
        RETURNING id`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password3", BCRYPT_WORK_FACTOR)
      ]);

  await db.query(`
  INSERT INTO game_collections
    (user_id, game_id)
  VALUES 
    (1, 'e44jncYuUp'),
    (2, '78ZDzlpvdb')`);
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
  commonAfterAll,
};