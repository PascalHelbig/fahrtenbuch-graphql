const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
require('dotenv').config();
const schema = require('./graphql/schema');


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

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
