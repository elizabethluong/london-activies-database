
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('activities_info', table => {
        table.increments();
        table.varchar('activity', 20).notNullable().unique();
        table.string('area').notNullable();
        table.string('price', 10).notNullable;
        table.string('type_of_activity').notNullable;
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable('activities_info');
};
