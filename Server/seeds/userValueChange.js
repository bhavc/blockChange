
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('priceChangeTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('priceChangeTable').insert([
        {user_email: 'bhavdip.dev@gmail.com', coin: 'BTC', 'current_value': 5260.00 },
        {user_email: 'bhavdip.dev@gmail.com', coin: 'DASH', 'current_value': 23.00 },
        {user_email: 'bhavdip.dev@gmail.com', coin: 'ETH', 'current_value': 800.00}
      ]);
    });
};
