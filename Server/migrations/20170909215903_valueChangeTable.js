
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('priceChangeTable', function(table){
      table.increments('id').primary();
      table.string('user_email')
      table.string('coin')
      table.decimal('current_value')
      table.decimal('final_value')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('priceChangeTable')
  ])
};
