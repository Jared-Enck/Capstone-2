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
      username,
      password,
      email
    )
    VALUES ('u1', $1, 'u1@email.com'),
           ('u2', $2, 'u2@email.com'),
           ('u3', $3, 'u3@email.com')
    RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password3", BCRYPT_WORK_FACTOR)
    ]
  );

  await db.query(`
    INSERT INTO game_collections
      (username, game_id)
    VALUES 
      ('u1', 'e44jncYuUp'),
      ('u1', 'nSZTnbgacm'),
      ('u2', '78ZDzlpvdb')
  `);

  await db.query(`
    INSERT INTO groups
      (id,name,admin_username)
    VALUES
      (1,'group1','u1'),
      (2,'group2','u2'),
      (3,'group3','u1')
  `);

  await db.query(`
    INSERT INTO users_groups
      (group_id, username)
    VALUES
      (1,'u1'),
      (1,'u2'),
      (2,'u2'),
      (3,'u1')
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

const u1Token = createToken({ username: 'u1' });
const u2Token = createToken({ username: 'u2' });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token
};