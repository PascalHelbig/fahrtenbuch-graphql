const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');

const app = express();
const PORT = 1337;

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
