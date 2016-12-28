const Promise = require('bluebird');
const request = require('supertest-as-promised');
const server = require('../server');
const config = require('../../knexfile');
const knex = require('knex')(config);
const User = require('../models/User');
const userController = require('../controllers/user');

let app;
let userToken;

const testQuery = (query, expectedStatus = 200) =>
  request(app)
    .post('/graphql')
    .send({ query })
    .expect(expectedStatus)
    .then(res => JSON.parse(res.text));

/**
 * start the server and migrate the database
 */
beforeAll(() =>
  Promise.all([
    new Promise((resolve) => { app = server(resolve); }),
    knex.migrate.latest(),
  ]).then(() =>
    knex.seed.run()
  )
);

describe('mutations', () => {
  it('should signup the user', () => {
    const query = `
      mutation {
        signup(email: "test@test.de", password: "12345") {
          token
        }
      }`;
    return testQuery(query).then((res) => {
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
    return testQuery(query)
      .then(res => expect(res.data.login.token).not.toBeNull());
  });

  it('should create a new boat', () => {
    const query = `
      mutation {
        addUserBoat(token: "${userToken}", boat: { name: "test boat" }) {
          name
        }
      }`;
    return testQuery(query).then((res) => {
      const { addUserBoat } = res.data;
      return expect(addUserBoat).toEqual({ name: 'test boat' });
    });
  });

  it('should addEntry', () => {
    const query = `
      mutation {
        addEntry(
          token: "${userToken}"
          entry: { text: "entry text", start: "2016-12-28", end: "2016-12-28", sailed: 1, motor: 2}
          participations: [{ user: 1234, boat: 1235 }]
         ) {
          text
          sailed
          motor
          participations { 
            user { id }
            boat { id }
          }
        }
      }`;
    return testQuery(query)
      .then(res => expect(res.data.addEntry).toMatchSnapshot());
  });

  it('should create a new group', () => {
    const query = `
      mutation {
        group1: addGroup(token: "${userToken}", group: { name: "Group 1", is_club: true }) {
          ...groupFragment
        }
        group2: addGroup(token: "${userToken}", group: { name: "Group 1", is_club: false }) {
          ...groupFragment
        }
      }
      fragment groupFragment on Group {
        name
        is_club
        members { name }
        boats { id }
      }`;
    return testQuery(query)
      .then(res => expect(res).toMatchSnapshot());
  });
});

describe('query', () => {
  it('should fetch all groups', () =>
    knex('memberships').del()
      .then(() => knex('groups').del())
      .then(() => knex('groups').insert([{ name: 'club 1', is_club: true }, { name: 'club 2', is_club: false }]))
      .then(() => {
        const query = `{
          groups { name, is_club }
        }`;
        return testQuery(query)
          .then(res => expect(res).toMatchSnapshot());
      })
  );

  it('should query me', () => {
    const query = `{ 
      me(token: "${userToken}" ) {
        email
        availableBoats { id }
        participations { id }
      }
    }`;
    return testQuery(query).then(res => expect(res).toMatchSnapshot());
  });

  it('should work with OwnerInterface', () =>
    new User().save().then(user =>
      Promise.all([
        user.boats().create({ name: 'users boat' }),
        user.groups().create({ name: 'a group' }).then(
          group => group.boats().create({ name: 'group boat' })
        ),
      ]).then(() => {
        const token = userController.generateToken(user);
        const query = `{
          me(token: "${token}") {
            availableBoats {
              id
              owner {
                ... on User {
                  name
                }
                ... on Group {
                  is_club
                }
              }
            }
          }
        }`;
        return testQuery(query).then(res => expect(res).toMatchSnapshot());
      })
    )
  );
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
