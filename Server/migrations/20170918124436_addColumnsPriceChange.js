
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('priceChangeTable', function(table) {
      table.decimal('valueChange')
      table.decimal('percentageChange')
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('priceChangeTable', function(table) {
      table.dropColumn('valueChange');
      table.dropColumn('percentageChange');
  })
])
};
