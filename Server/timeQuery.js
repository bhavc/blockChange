var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');
var fetch = require('node-fetch');
var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
var twilio = require('twilio')



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


//function that sends a daily reminder notification
function timeApiPull(coin, email, time){
var job = new CronJob(`*/${time} * * * * *`, function() {
  //pulls the price API every at whatever time the user specifies
  console.log(`updating final value with api every ${time} seconds`)
  fetch(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=CAD&extraParams=your_app_name`)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log('here:', json);
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
        console.log(res[0])
        //Function that runs a callback that selects the initial value and final value
        //and calculates the difference between the two
        let currentValue = Number(res[0].current_value)
        console.log(currentValue)
        let finalValue = Number(res[0].final_value)
        console.log(finalValue)

        console.log("this is when you get a notification")
        //sends an email using nodemailer here
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_EMAIL_PASS
          }
        });

        var mailOptions = {
          from: 'bhavdip.dev@gmail.com',
          to: `${email}`,
          subject: `Your ${coin} value changed!`,
          text: `Your ${coin} value changed from $ ${currentValue} to $ ${finalValue}`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        //sends an sms via twilio here
        var accountSid = process.env.ACCOUNT_SID
        console.log(accountSid)
        var authToken = process.env.AUTH_TOKEN

        var client = new twilio(accountSid, authToken);

        client.messages.create({
          body: `Notification! ${coin} price currently at $ ${finalValue} CAD`,
          to: process.env.TO_SMS,
          from: process.env.FROM_SMS
        })
        .then((message) => console.log(message.sid))
        job.stop();


      })
    })
  }, function () {

    },
    true
  );
}

module.exports = {
  timeApiPull
};
