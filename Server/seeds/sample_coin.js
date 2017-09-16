
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coinValue').del()
    .then(function () {
      // Inserts seed entries
      return knex('coinValue').insert([
        {user: 1, coin: 'ETH', price: 1, quantity: 1, total: 1},
        {user: 1, coin: 'LTC', price: 1, quantity: 1, total: 1},
      ]);
    });
};
