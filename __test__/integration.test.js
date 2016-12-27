const Promise = require('bluebird');
const request = require('supertest-as-promised');
const server = require('../server');
const config = require('./../knexfile');
const knex = require('knex')(config);

let app;
let userToken;

const signUpUser = () => {
  const query = `
    mutation {
      signup(email: "test@test.de", password: "12345") {
        token
      }
    }`;
  return request(app)
    .post('/graphql')
    .send({ query })
    .expect(200)
    .then(res => JSON.parse(res.text))
    .then((res) => {
      userToken = res.data.signup.token;
      return expect(userToken).not.toBeNull();
    });
};

/**
 * start the server and migrate the database
 */
beforeAll(() =>
  Promise.all([
    new Promise((resolve) => { app = server(resolve); }),
    knex.migrate.latest(),
  ]).then(() => signUpUser())
);

it('should login the user', () => {
  const query = `
    mutation {
      login(email: "test@test.de", password: "12345") {
        token
      }
    }`;
  return request(app)
    .post('/graphql')
    .send({ query })
    .expect(200)
    .then(res => JSON.parse(res.text))
    .then(res => expect(res.data.login.token).not.toBeNull());
});

it('should run hello world on GET /', () =>
  request(app)
    .get('/')
    .expect(200)
    .then(res => expect(res.text).toBe('Hello World!'))
);

/**
 * shutdown the server and rollback the database
 */
afterAll(() =>
  Promise.all([
    new Promise(resolve => app.close(resolve)),
    knex.migrate.rollback(),
  ])
);
