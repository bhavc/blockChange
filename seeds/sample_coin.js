
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coins').del()
    .then(function () {
      // Inserts seed entries
      return knex('coins').insert([
        {id: 1, coin: 'bitcoin'},
        {id: 2, coin: 'ethereum'},
        {id: 3, coin: 'bitcoin-cash'},
        {id: 4, coin: 'ripple'},
        {id: 5, coin: 'litecoin'},
        {id: 6, coin: 'nem'},
        {id: 7, coin: 'dash'},
        {id: 8, coin: 'iota'},
        {id: 9, coin: 'monero'},
        {id: 10, coin: 'ethereum-classic'}
      ]);
    });
};
