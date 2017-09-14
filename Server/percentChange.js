//your also gonna have to run cronjob for this
var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');

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


function setInitialPrice(coin){
  request(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=BTC,CAD,USD,EUR&extraParams=your_app_name`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // var json = JSON.parse(body);
      // let canadianCurrency = json['CAD']
      return body
      }
    })
  }

console.log(setInitialPrice('BTC'))
