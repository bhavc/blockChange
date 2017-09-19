
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('priceChangeTable', function(table) {
      table.boolean('activeNotifications')
      table.dropColumn('valueChange');
      table.dropColumn('percentageChange');

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('priceChangeTable', function(table) {
      table.decimal('valueChange')
      table.decimal('percentageChange')
      table.dropColumn('activeNotifications')
    })
  ])
};
