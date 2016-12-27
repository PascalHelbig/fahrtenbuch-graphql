jest.mock('./server');
const server = require('./server');

it('should start the server', () => {
  require('./index');
  expect(server).toHaveBeenCalledTimes(1);

  // test the parameters of the first (and only) call:
  const parameters = server.mock.calls[0];
  expect(parameters).toHaveLength(1);
  expect(parameters[0]).toBeInstanceOf(Function);
});
