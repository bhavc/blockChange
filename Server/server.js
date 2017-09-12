const http = require("http");
const express = require("express");
const app = express();

app.use(require('cors')());

app.post("/notification", function(req, res) {
	console.log(req.body)
  res.send("here is the json values");
})

app.get("/notification", function(req, res) {
	console.log(res.body)
  res.send("here is the json values");
})

http.createServer(app).listen(3001, function() {
  console.log("Server started at post 3001");
});
