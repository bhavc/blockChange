var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');
var fetch = require('node-fetch');
var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
var twilio = require('twilio')
require('dotenv').config()


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

function cronApiPullPercentage(coin, email, percentChange){
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
          .andWhere('user_email', email)
          .andWhere('final_value', null)
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
        let priceDifference = finalValue - currentValue
        console.log(priceDifference)
        let absolutePercentChange = Math.abs(percentChange)


        if(priceDifference >= (absolutePercentChange/100)) {
          console.log("this is when you get a notification")
          var accountSid = process.env.ACCOUNT_SID
          var authToken = process.env.AUTH_TOKEN

          var client = new twilio(accountSid, authToken);

          //env your phone number
          client.message.create({
            body: 'your coins be dropping fam',
            to: process.env.TO_SMS,
            from: process.env.FROM_SMS
          })
          .then((message) => console.log(message.sid))
          job.stop();
        }

      })
    })
  }, function () {

    },
    true
  );
}

module.exports = {
  cronApiPull
};
