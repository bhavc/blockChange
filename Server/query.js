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

//create a function that handles both setting the initial and final price

function setInitialPrice(coin, email){
  //creates a request for the cryptocompare api
  request(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=BTC,CAD,USD,EUR&extraParams=your_app_name`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      //set the value json to the JSON format of the body parameter of the response
      var json = JSON.parse(body);
      //canadianCurrency is the brice returned in Canadian Dollars
      let canadianCurrency = json['CAD']

      //update the current value (or initial price) based on specific queries
      knex('priceChangeTable')
      .update({current_value: canadianCurrency})
      .where('user_email', email)
        .andWhere('coin', coin)
        .andWhere('current_value', null)
      .catch(function(err) {
        console.error(err);
      })
    }
  })
}

// same as the function above except this time if sets the final price
function setFinalPrice(coin, email){
  return new Promise((resolve, reject) => {
    request(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=BTC,CAD,USD,EUR&extraParams=your_app_name`, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);
        let canadianCurrency = json['CAD']

        knex('priceChangeTable')
        .update({final_value: canadianCurrency})
        .where('user_email', email)
          .andWhere('coin', coin)
          .andWhere('final_value', null)
        .then(resolve)
        .catch(function(err) {
          console.error(err);
          reject(err);
        })
      } else {
        reject(error);
      }
    });
  });
}

//function that checks the difference beetween the initial value and the final
//value
//final value is called after the user specified time 
function timeQuery(coin, email, time, id) {
  let myPromise = new Promise((resolve, reject) => {
    setInitialPrice(coin, email)

    setTimeout(function() {
      setFinalPrice(coin, email).then(() => {
        resolve(id);
      });
    }, time+1000)
  })
  return myPromise;
}

// this function sends an email to user id 1
function emailer(id){
  knex('priceChangeTable')
  .where(function(){
    this.where('id', id)
  })
  .then(function(res) {

    console.log('res from emailer',res)

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhavdip.dev@gmail.com',
        pass: '!3Hj.e.n'
      }
    });

    var mailOptions = {
      from: 'bhavdip.dev@gmail.com',
      to: `${res[0].user_email}`,
      subject: `${res[0].coin} Update!`,
      text: `The value of ${res[0].coin} has changed from ${res[0].current_value}
      to ${res[0].final_value} since you set your notification price`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  })
  .catch(function(err){
    console.log(err);
  })
}

module.exports = {
  setFinalPrice, setInitialPrice, timeQuery, emailer
};
