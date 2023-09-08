require('dotenv').config();
const { env } = process;

const config = {
  SECRET_KEY: env.SECRET_KEY,
  PORT: env.PORT || 3001,
  DB_URI: getDatabaseUri,
  BCRYPT_WORK_FACTOR: env.NODE_ENV === 'test' ? 1 : 13,
  API_BASE_V1: env.API_BASE_V1,
  API_BASE_V2: env.API_BASE_V2,
};

function getDatabaseUri() {
  const dbase = env.NODE_ENV === 'test' ? env.DATABASE_TEST : env.DATABASE;
  if (env.NODE_ENV === 'production') {
    return env.DATABASE_URL;
  }
  return `socket:/var/run/postgresql?db=${dbase}`;
}

module.exports = config;
