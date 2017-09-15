var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');
var fetch = require('node-fetch');
var CronJob = require('cron').CronJob;
var cron = require('node-cron');

const knex = require('knex') ({
  client : 'pg',
  connection : {
    user : settings.user,
    password : settings.password,
    database : settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

return new Promise(function(resolve, reject) {
  resolve();

  reject();
});



function initiateChangeTracking(initialCoinValue, query, value, coin) {
  let updatedValue = 0;
  let startValue = initialCoinValue;
  let url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=CAD&extraParams=your_app_name`

  findAllUsersNotUpdated().then(function(users) {

    findAllChangesForEachUser(users).then(function(user, change) {
      checkIfNotificationNeeded(user, check).then(function(users) {
        emailUsersUpdates(user);
      })
    });

  })

  fetch(url)
  .then(function(res) {
    return res.json();
  }).then(function(json) {
    canadianCurrency = json.CAD
    updatedValue += canadianCurrency
  })
}



initiateChangeTracking(5, 'True', 5, 'BTC');
