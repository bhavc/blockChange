var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
const settings = require("./settings")
const { setInitialPrice, setFinalPrice, timeQuery, emailer } = require('./query')

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


app.use(require('cors')());
app.use(bodyParser.json())

app.post("/notification", function(req, res) {

  


  console.log(req.body)
  knex('priceChangeTable').insert({user_email: req.body.useremail, coin: req.body.coin, queryType: req.body.type})
  .returning('id')
  .then(function (result) {
    res.json({ success: true, message: 'ok' });
    return timeQuery(req.body.coin, req.body.useremail, req.body.value, Number(result))
  })
  .then( (id) => {
    emailer(id)
  })


})

app.get("/usercoins", function(req, res) {
  knex.select().from('coinValue')
  .then(function(result){
    res.send(result)
  })
})


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
