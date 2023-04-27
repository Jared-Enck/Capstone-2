"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
const env = process.env
require("colors");

const SECRET_KEY = env.SECRET_KEY || "secret-dev";

const PORT = +env.PORT || 3001;

// Use dev database or testing database

function getDatabaseUri() {
  const dbase = (env.NODE_ENV === "test")
    ? env.DATABASE_TEST
    : env.DATABASE;
  return `socket:/var/run/postgresql?db=${dbase}`
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested

const BCRYPT_WORK_FACTOR = env.NODE_ENV === "test" ? 1 : 13;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};