"use strict";
const bcrypt = require("bcrypt");

const db = require("./db.js");
const { BCRYPT_WORK_FACTOR } = require("./config.js");
const { createToken } = require("./helpers/tokens.js");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM game_collections");
  await db.query("DELETE FROM groups");
  await db.query("DELETE FROM users_groups");

  await db.query(`
    INSERT INTO users(
      id,
      username,
      password,
      email
    )
    VALUES (1,'u1', $1, 'u1@email.com'),
           (2,'u2', $2, 'u2@email.com'),
           (3,'u3', $3, 'u3@email.com')
    RETURNING id`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password3", BCRYPT_WORK_FACTOR)
    ]
  );

  await db.query(`
    INSERT INTO game_collections
      (user_id, game_id)
    VALUES 
      (1, 'e44jncYuUp'),
      (1, 'nSZTnbgacm'),
      (2, '78ZDzlpvdb')
  `);
  
  await db.query(`
    INSERT INTO groups
      (id,name,admin_user_id)
    VALUES
      (1,'group1',1),
      (2,'group2',2),
      (3,'group3',1)
    RETURNING id
  `);

  await db.query(`
    INSERT INTO users_groups
      (group_id, user_id)
    VALUES
      (1,1),
      (1,2),
      (2,2),
      (3,1)
  `);
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

const u1Token = createToken({id: 1, username: 'u1'});
const u2Token = createToken({id: 2, username: 'u2'});

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token
};