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

  //We need to add a switch statement for the query conditions

  console.log(req.body.value)
  knex('priceChangeTable').insert({user_email: req.body.useremail, coin: req.body.coin, queryType: req.body.type})
  .returning('id')
  .then(function (result) {
    console.log(result)
    res.json({ success: true, message: 'ok' });
    return timeQuery(req.body.coin, req.body.useremail, req.body.value, Number(result))
  })
  .then( (id) => {
    emailer(id)
  })


})

http.createServer(app).listen(3001, function() {
  console.log("Server started at post 3001");
});
