const Promise = require('bluebird');
const request = require('supertest-as-promised');
const server = require('../server');
const config = require('../../knexfile');
const knex = require('knex')(config);

let app;
let userToken;

/**
 * start the server and migrate the database
 */
beforeAll(() =>
  Promise.all([
    new Promise((resolve) => { app = server(resolve); }),
    knex.migrate.latest(),
  ])
);

it('should signup the user', () => {
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
});

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

it('should create a new boat', () => {
  const query = `
    mutation {
      addUserBoat(token: "${userToken}", boat: { name: "test boat" }) {
        name
      }
    }`;
  return request(app)
    .post('/graphql')
    .send({ query })
    .expect(200)
    .then(res => JSON.parse(res.text))
    .then((res) => {
      const { addUserBoat } = res.data;
      return expect(addUserBoat).toEqual({ name: 'test boat' });
    });
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
