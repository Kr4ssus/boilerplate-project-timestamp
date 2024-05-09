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

// Returns timestamps
app.get("/api/:date?", function (req, res) {
    const dateString = req.params.date;

    // If date string is empty, use current date
    if (!dateString) {
        const currentDate = new Date();
        const unixTimestamp = currentDate.getTime();
        const utcString = currentDate.toUTCString();

        res.json({ unix: unixTimestamp, utc: utcString });
        return;
    }
    
    const dateObject = new Date(dateString);

    // Check if the date is valid
    if (!isNaN(dateObject.getTime())) {
        const unixTimestamp = dateObject.getTime();
        const utcString = dateObject.toUTCString();

        res.json({ unix: unixTimestamp, utc: utcString });
    } else if (!isNaN(parseInt(dateString))) { // Check if dateString is a valid Unix timestamp
        const unixTimestamp = parseInt(dateString);
        const utcString = new Date(unixTimestamp).toUTCString();

        res.json({ unix: unixTimestamp, utc: utcString });
    } else {
        res.json({ error: "Invalid Date" });
    }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
