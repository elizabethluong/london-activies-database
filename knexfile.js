// Update with your config settings.
require('dotenv').config();
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${user}:${password}@localhost/activities`,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  }
};
