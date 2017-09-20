var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');
var fetch = require('node-fetch');
var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
var twilio = require('twilio')
// require('dotenv').config()


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
        console.log(currentValue)
        let finalValue = Number(res[0].final_value)
        console.log(finalValue)
        let priceDifference = finalValue - currentValue
        let absolutepriceDifference = Math.abs(priceDifference)
        console.log(absolutepriceDifference)
        let absolutePercentChange = Math.abs((percentChange/100)*currentValue)
        console.log(absolutePercentChange)


        if(absolutepriceDifference >= absolutePercentChange) {
          console.log("this is when you get a notification")

          //send email
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bhavdip.dev@gmail.com',
              pass: '!3Hj.e.n'
            }
          });

          var mailOptions = {
            from: 'bhavdip.dev@gmail.com',
            to: `${email}`,
            subject: `Your ${coin} value changed!`,
            text: `Your ${coin} value changed from ${currentValue} to ${finalValue}`
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });


          //send twilio
          var accountSid = process.env.ACCOUNT_SID
          console.log(accountSid)
          var authToken = process.env.AUTH_TOKEN

          var client = new twilio(accountSid, authToken);

          client.messages.create({
            body: `Notification! ${coin} price has changed by ${absolutePercentChange.toFixed(3)}%`,
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
  cronApiPullPercentage
};
