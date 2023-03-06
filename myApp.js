require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var env = require('dotenv');

app.use('', function(req, res, next){
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  let absolutePath = __dirname + '/views/index.html';
  // res.send("Hello Express");
  res.sendFile(absolutePath);
});

// serve static files from a folder when the path contains /public
// express.static is a middleware function
app.use('/public', express.static(__dirname + '/public'));

app.get('/json', function(req, res) {
  res.json({"message" : "Hello json"});
});

/* app.get('/json', function(req, res) {
  if(process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({"message" : "HELLO JSON"});
  } else {
    res.json({"message" : "Hello json"});
  }
}); */
 
const getDate = (req, res, next) => {
  req.time = new Date().toString();
  next();
}

app.get('/now', getDate, (req, res) => {
  res.json({time: req.time});
})

app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
})

// app.get('/name', function(req, res) {
//   res.json({name: req.query.first + ' ' + req.query.last});
// })

// app.post('/name', function(req, res) {
//   res.json({name: req.query.first + ' ' + req.query.last});
// }).use(bodyParser)



app.get('/name', (req, res) => {
  const firstname = req.query.first;
  const lastname = req.query.last;
  console.log(firstname + " " + lastname);
  res.json({name: `${firstname} ${lastname}`})
})

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  console.log(string);
  res.json({ name: string });
});

console.log("Hello World");