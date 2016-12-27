const server = require('./server');

server(() => console.log(`Server is running on ${process.env.PORT}`));
