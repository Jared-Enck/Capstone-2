"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
const env = process.env;
require("colors");

const SECRET_KEY = env.SECRET_KEY || "secret-dev";

const PORT = +env.PORT || 3001;
const IOPORT = +env.IOPORT || 5000;

// Use dev database or testing database

function getDatabaseUri() {
  const dbase = (env.NODE_ENV === "test")
    ? env.DATABASE_TEST
    : env.DATABASE;
  return `socket:/var/run/postgresql?db=${dbase}`;
};

// Speed up bcrypt during tests, since the algorithm safety isn't being tested

const BCRYPT_WORK_FACTOR = env.NODE_ENV === "test" ? 1 : 13;

// vars for API
const CLIENT_ID = env.CLIENT_ID;
const API_BASE_URL = env.API_BASE_URL;

module.exports = {
  SECRET_KEY,
  PORT,
  IOPORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  CLIENT_ID,
  API_BASE_URL
};