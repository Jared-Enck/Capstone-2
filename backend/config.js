require('dotenv').config();
const { env } = process;

const config = {
  SECRET_KEY: env.SECRET_KEY,
  HOSTNAME: env.HOSTNAME,
  PORT: env.PORT || 3001,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_URI: getDatabaseUri,
  BCRYPT_WORK_FACTOR: env.NODE_ENV === 'test' ? 1 : 13,
  CLIENT_ID: env.CLIENT_ID,
  API_BASE_URL: env.API_BASE_URL,
  USER: env.USER,
};

function getDatabaseUri() {
  const { USER, DB_PASSWORD, HOSTNAME, PORT } = config;
  const dbase = env.NODE_ENV === 'test' ? env.DATABASE_TEST : env.DATABASE;
  if (env.NODE_ENV === 'production') {
    return `postgres://${USER}:${DB_PASSWORD}@${HOSTNAME}:${PORT}/${dbase}`.replace(
      '://',
      'ql://',
      1
    );
  }
  return `socket:/var/run/postgresql?db=${dbase}`;
}

console.debug('*****DB_URI: ', config.DB_URI());

module.exports = config;
