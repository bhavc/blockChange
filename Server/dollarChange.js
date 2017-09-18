var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');
var fetch = require('node-fetch');
var CronJob = require('cron').CronJob;

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

// return new Promise(function(resolve, reject) {
//   resolve();
//
//   reject();
// });

//pull api and update the value every so often inside cron job
//either make another function that deals with the logic, OR just run
//evrything inside the same cron job

//value change is the query

function cronApiPull(coin, queryParam){
var job = new CronJob('*/5 * * * * *', function() {
  console.log('updating final value with api every 5 seconds')
  fetch(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=CAD&extraParams=your_app_name`)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
        knex('priceChangeTable')
        .update({final_value: json.CAD})
        .where('coin', coin)
        .catch(function(err) {
          console.log(err)
        })
    })
    .then(function() {
      knex.select()
      .from('priceChangeTable')
      .where('coin', coin)
      .then(function(res) {
        let currentValue = Number(res[0].current_value)
        let finalValue = Number(res[0].final_value)
        let change = finalValue - currentValue

        if (change <= queryParam){
          console.log('sending email')
          //call emailer function here
        }
      })
    })
  }, function () {

    },
    true
  );
}

cronApiPull('BTC', 1)
