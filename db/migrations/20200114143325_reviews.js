exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments();
    table.string("review").notNullable();
    table.integer("activity_id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("reviews");
};
