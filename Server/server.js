var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
const settings = require("./settings")
const { setInitialPrice, setFinalPrice, timeQuery } = require('./query')

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
  //here you want to get by id ideally for the new ly created row
  knex('priceChangeTable').insert({user_email: req.body.useremail, coin: req.body.coin, queryType: req.body.type})
  .then(function (result) {
    res.json({ success: true, message: 'ok' });
    timeQuery()
  })
})

http.createServer(app).listen(3001, function() {
  console.log("Server started at post 3001");
});
