
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coinValue', function(table) {
      table.dropColumn('price');
      table.dropColumn('total');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('coinValue', function(table) {
      table.decimal('price');
      table.decimal('total');
    })
  ])

};
