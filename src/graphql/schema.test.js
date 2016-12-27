const { graphql } = require('graphql');
const schema = require('./schema');

jest.mock('../models/Entry.js');
jest.mock('../models/Group.js');
jest.mock('../models/User.js');

it('should matches all types', () => {
  const query = `
    query {
      __schema {
        types {
          name
          fields { name, type { name } }
        }
      }
    }
  `;
  return graphql(schema, query).then(result =>
    expect(result).toMatchSnapshot()
  );
});
