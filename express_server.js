var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

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
// app.get('/', function(req, res) {
//     var family = [
//       { name : 'Barry Black', role : 'father'},
//       { name : 'Mary Black' , role : 'mother'},
//       { name : 'Aaron Black', role : 'husband'},
//       { name : 'HyunJung oh', role : 'wife'}
//     ];

//     var string = 'Okay Good!';

//     res.render('pages/index', {
//       family : family,
//       string : string 
//     });
// });

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


// about page 
app.get('/about', function(req, res) {
    res.render('about');
});

//function
function genRandomStr(){
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var strLen = "6";
  var ranStr = "";

  for (var i=0; i<strLen; i++){
    var rnum = Math.floor(Math.random()* chars.length);
    ranStr += chars.substring(rnum, rnum + 1);
  }
 return ranStr;
}

app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL;
  let longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});


//post request
app.post("/urls", (req, res) => {
  //add a key: short value: long 
  var shortURL = genRandomStr();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls");         // Respond with 'Ok' (we will replace this)
});


app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id, urlDB: urlDatabase };
  res.render("urls_show", templateVars);
});

//edit the url
app.post("/urls/:id/edit", (req, res) => {
  let editElem = req.params.id;
  urlDatabase[editElem] = req.body.longUrl;

//  let templateVars = {shortURL: editElem, urlDB: urlDatabase};

  res.redirect("/urls");
  });
 

// delete the url
app.post("/urls/:id/delete", (req, res) => {
  let deleteElem = req.params.id;
  console.log(deleteElem);

  delete urlDatabase[deleteElem];

  res.redirect("/urls");
}
);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

