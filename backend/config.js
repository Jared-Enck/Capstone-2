require('dotenv').config();
const { env } = process;

const config = {
  SECRET_KEY: env.SECRET_KEY,
  PORT: env.PORT || 3001,
  DB_URI: getDatabaseUri,
  BCRYPT_WORK_FACTOR: env.NODE_ENV === 'test' ? 1 : 13,
  CLIENT_ID: env.CLIENT_ID,
  API_BASE_URL: env.API_BASE_URL,
};

function getDatabaseUri() {
  const dbase = env.NODE_ENV === 'test' ? env.DATABASE_TEST : env.DATABASE;
  if (env.NODE_ENV === 'production') {
    return `postgres:///${dbase}`.replace('://', 'ql://', 1);
  }
  return `socket:/var/run/postgresql?db=${dbase}`;
}

console.debug('*****DB_URI: ', config.DB_URI());

module.exports = config;
