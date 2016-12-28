require('dotenv').config();

const envs = {
  test: {
    client: 'mysql',
    connection: {
      database: process.env.DB_DATABASE_TEST,
      user: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
    },
  },
  normal: {
    client: 'mysql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    debug: process.env.LOG_SQL === 'on',
  },
};

module.exports = envs[process.env.NODE_ENV || 'normal'];
