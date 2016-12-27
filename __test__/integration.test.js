const Promise = require('bluebird');
const request = require('supertest-as-promised');
const server = require('./../server');
const config = require('./../knexfile');
const knex = require('knex')(config);

let app;

/**
 * start the server and migrate the database
 */
beforeAll(() =>
  Promise.all([
    new Promise((resolve) => { app = server(resolve); }),
    knex.migrate.latest(),
  ])
);

it('should run hello world on GET /', () =>
  request(app)
    .get('/')
    .expect(200)
    .then(res => expect(res.text).toBe('Hello World!'))
);

it('should test', () => {
// Todo: Write some graphql tests!
});

/**
 * shutdown the server and rollback the database
 */
afterAll(() =>
  Promise.all([
    new Promise(resolve => app.close(resolve)),
    knex.migrate.rollback(),
  ])
);
