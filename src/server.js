const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
require('dotenv').config();
const schema = require('./graphql/schema');

module.exports = (fn) => {
  const app = express();
  app.use(cors());
  app.get('/', (req, res) => res.send('Hello World!'));
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
    }),
  }));

  return app.listen(process.env.PORT, fn);
};
