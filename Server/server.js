var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
const settings = require("./settings")

//importing functions that calculate initial and final price & the module
//that allows for an email to be sent
const { setInitialPrice, setFinalPrice } = require('./query')
const { cronApiPull } = require('./dollarChange')
const { cronApiPullPercentage } = require('./percentChange')
const { timeApiPull } = require('./timeQuery')
//configuring environment variables
require('dotenv').config()

//requiring knex, sets database parameters
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

//imports 'cors', allows a resource to make a cross-origin HTTP request
app.use(require('cors')());
app.use(bodyParser.json())

//create a post request to the /notification endpoint
app.post("/notification", function(req, res) {

  console.log(req.body)

//switch statement that takes in the type of query a user makes
  switch(req.body.type ) {

    //if the user wants to know of a dollar amount change, this case is run
    case 'value $':
        console.log('you selected value')
        //if the value parameter is chose, insert into the database the user email, the coin they're interested in and the type of query
        knex('priceChangeTable').insert({user_email: req.body.useremail, coin: req.body.coin, queryType: req.body.type})
        //returns the id of the newly made entry
        .returning('id')
        .then (function (result) {
          //sets in the initial price in the database
          setInitialPrice(req.body.coin, req.body.useremail)
          res.json({ success: true, message: 'ok'})
        }).then(function () {
          console.log('setting final value')
          //runs the cron ApiPull function which updates the final price
          cronApiPull(req.body.coin, req.body.useremail, req.body.value)
        })
        break;
    //if the user wants to know of a percentage change, this case is run
    case 'percent %':
        console.log('you selected percent')
        //exact same logic as above, except this time the cronApiPullPercentage function is called
        knex('priceChangeTable').insert({user_email: req.body.useremail, coin: req.body.coin, queryType: req.body.type})
        .returning('id')
        .then(function(result) {
          setInitialPrice(req.body.coin, req.body.useremail)
          res.json({success: true, message: 'ok'})
        }).then(function () {
          cronApiPullPercentage(req.body.coin, req.body.useremail, req.body.value)
        })
        break;
    //if the user wants to be notified after a specific amount of time, run this case
    case 'time':
        console.log('you selected time')
        //same logic as above
        knex('priceChangeTable').insert({user_email: req.body.useremail, coin: req.body.coin, queryType: req.body.type})
        .returning('id')
        .then(function (result) {
          //runs the function timeQuery
          setInitialPrice(req.body.coin, req.body.useremail)
          res.json({ success: true, message: 'ok' })
        }).then(function () {
          timeApiPull(req.body.coin, req.body.useremail, req.body.value)
        })
        break;
    default:
        console.log('you need a valid query')
      }

})

//makes a get request to the /usercoins endpoint,
//sends in all the entries from the table coinValue and presents them as
//an api
app.get("/usercoins", function(req, res) {
  knex.select().from('coinValue')
  .then(function(result){
    res.send(result)
  })
})

//makes a get request to the /usernotifications,
//sends in all the entries from the table priceChangeTable and presents
//them as an api
app.get("/usernotifications", function(req, res) {
  knex.select().from('priceChangeTable')
  .then(function(result){
    res.send(result)
  })
})


//makes a post request to the /usercoins,
//everything posted at the endpoint is then
//processed and entered into the database table.
//if the coin already exists for a user, the previous value
//is updated
app.post("/usercoins", function(req, res) {
  console.log(req.body.coin)

  knex.select().from('coinValue')
  .then(function(result){
    coinArray = []
    for (i in result) {
      coinArray.push(result[i].coin)
    }
      if (coinArray.includes(req.body.coin)) {
        knex('coinValue')
        //update everything here
        .update({price: req.body.price, quantity: req.body.amount, total: req.body.totalCAD})
        .where({coin: req.body.coin})
        .then( function (result) {
          res.json({success: true, message: 'ok'})
        })
      } else {
        knex('coinValue').insert({user: req.body.userId, coin: req.body.coin, price: req.body.price, quantity: req.body.amount, total: req.body.totalCAD})
        .then( function (result) {
          res.json({success: true, message: 'ok'});
        })
      }
  })
})

http.createServer(app).listen(3001, function() {
  console.log("Server started at post 3001");
});
