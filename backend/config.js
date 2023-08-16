require('dotenv').config();
const { env } = process;

const config = {
  SECRET_KEY: env.SECRET_KEY,
  HOST: env.HOST,
  PORT: +env.PORT || 3001,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_URI: getDatabaseUri,
  BCRYPT_WORK_FACTOR: env.NODE_ENV === 'test' ? 1 : 13,
  CLIENT_ID: env.CLIENT_ID,
  API_BASE_URL: env.API_BASE_URL,
  USER: env.USER,
};

function getDatabaseUri() {
  const { SECRET_KEY, PORT, USER, HOST } = config;
  const dbase = env.NODE_ENV === 'test' ? env.DATABASE_TEST : env.DATABASE;
  if (env.NODE_ENV === 'production') {
    return `postgres://${USER}:${DB_PASSWORD}@${HOST}/${dbase}`;
  }
  return `socket:/var/run/postgresql?db=${dbase}`;
}

module.exports = config;
