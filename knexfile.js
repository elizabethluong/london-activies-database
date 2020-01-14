// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:875431Ab!@localhost/activities"
  },
  migrations: {
    directory: __dirname + "/db/migrations"
  },
  seeds: {
    directory: __dirname + "/db/seeds"
  }
};
