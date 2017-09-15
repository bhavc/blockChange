
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coinValue', function(table) {
      table.increments('id').primary();
      table.integer('user').references('id').inTable('users').notNull().onDelete('cascade');
      table.string('coin');
      table.integer('price');
      table.integer('quantity');
      table.integer('total');

    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('coinValue');
};
