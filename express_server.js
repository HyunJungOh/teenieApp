var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

// set the view engine to ejs
app.set('view engine', 'ejs');

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// app.get("/urls.json", (req, res) => {
//     res.json(urlDatabase);
//   });

// app.get("/", (req, res) => {
//   res.end("Hello!");
// });

// app.get("/practice", (req, res) => {
//   res.end("<html><body><h2>Hi chagiya!</h2></body></html>");
// });


// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    var family = [
      { name : 'Barry Black', role : 'father'},
      { name : 'Mary Black' , role : 'mother'},
      { name : 'Aaron Black', role : 'husband'},
      { name : 'HyunJung oh', role : 'wife'}
    ];

    var string = 'Okay Good!';

    res.render('pages/index', {
      family : family,
      string : string 
    });
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

