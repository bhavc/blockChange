var request = require('request');
var CronJob = require('cron').CronJob;
const settings = require('./settings')

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


//run a CronJob that pulls an api every 5 seconds and appends this to the
//priceChangeTable
let apiCall = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function() {
    //call the api from within here
    request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,CAD,USD,EUR&extraParams=your_app_name', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('making an api call every 10 seconds')
        var json = JSON.parse(body);
        let canadianCurrency = json['CAD']

        console.log(canadianCurrency)

        knex('priceChangeTable')
        .where('id', 1)
        .update({
          final_value: canadianCurrency
        })
        knex.select('final_value')
          .from('priceChangeTable')
          .where(function(){
            this.where('id', 1)
          })
          .then(function(results) {
          console.log(results)
        })
        .catch(function(err) {
          console.error();(err)
        })
        .then(function(results) {
        console.log(results)
      })

      }
    })
  },

  start: false
});

apiCall.start();
