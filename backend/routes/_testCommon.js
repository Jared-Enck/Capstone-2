"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await User.register({
    username: "u1",
    email: "user1@user.com",
    password: "password1"
  });
  await User.register({
    username: "u2",
    email: "user2@user.com",
    password: "password2"
  });
  await User.register({
    username: "u3",
    email: "user3@user.com",
    password: "password"
  });
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

const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });
const u3Token = createToken({ username: "u3" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  u3Token
};