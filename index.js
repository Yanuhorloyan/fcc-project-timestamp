// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", function (req, res) {
  let date = new Date().getTime();
  const unix = date;
  const utc = new Date(date).toUTCString();

  res.json({ unix, utc });
})

app.get("/api/:date", function (req, res) {
  let date_string = req.params.date;

  if (date_string === undefined) {
    res.json({ error : 'Invalid Date' });
    return;
  }

  if (date_string.includes('-') || !isNaN(new Date(date_string))) {
    if (isNaN(new Date(date_string))) {
      res.json({ error : 'Invalid Date' });
      return;
    }
    date = new Date(date_string);
  } else if (!Number.isNaN(Number(date_string))) {
    if (isNaN(new Date(Number(date_string)))) {
      res.json({ error : 'Invalid Date' });
      return;
    }
    date = new Date(Number(date_string));
  } else {
    res.json({ error : 'Invalid Date' });
    return;
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.json({ unix, utc });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
