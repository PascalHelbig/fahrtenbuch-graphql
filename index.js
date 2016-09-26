const express = require('express');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();
const schema = require('./graphql/schema');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
