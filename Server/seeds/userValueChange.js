
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('priceChangeTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('priceChangeTable').insert([
        {id: 1, user_email: 'bhavdip.dev@gmail.com', coin: 'bitcoin', 'current_value': 4000.00 },
        {id: 2, user_email: 'bhavdip.dev@gmail.com', coin: 'dash', 'current_value': 23.00 },
        {id: 3, user_email: 'bhavdip.dev@gmail.com', coin: 'ethereum', 'current_value': 800.00}
      ]);
    });
};
