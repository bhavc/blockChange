
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('coins')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('coins', function(table){
      table.increments('id').primary();
      table.string('coin');
    })
  ])
};
