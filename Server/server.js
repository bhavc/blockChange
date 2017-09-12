const http = require("http");
const express = require("express");
const app = express();

app.use(require('cors')());

app.get("/notification", function(req, res) {
  res.send("here is the json values");
})

http.createServer(app).listen(3001, function() {
  console.log("Server started at post 3001");
});
