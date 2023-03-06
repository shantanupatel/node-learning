require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World");

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, (req, res) => {
    res.send({
      time: req.time
    });
});