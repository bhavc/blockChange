
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('priceChangeTable', function(table){
      table.string('queryType');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('priceChangeTable', function(table){
      table.dropColumn('queryType')
    })
  ])
};
