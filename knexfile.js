module.exports = {
  client: 'mysql',
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  debug: process.env.LOG_SQL === 'on',
};
