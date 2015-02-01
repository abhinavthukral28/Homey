//twilio credentials
var accountSid = 'ACb90ca8a55311aff697443481e485ba09',
    authToken = '09017f12b95041004e317af8d0775893',
    twilioModule = require('twilio')(accountSid, authToken);
twilioClient = {
    client: twilioModule,
    from: "+12268871679",
    to: "",
    enabled: false
};

var func = require("./functions.js");

func.setLcd();

// call the packages we need
var express = require('express'), // call express
    app = express(), // define our app using express
    bodyParser = require('body-parser');

var port = process.env.PORT || 8080; // set our port

//API's
var light = require('./routes/light.js'),
    temperature = require('./routes/temperature.js'),
    sound = require('./routes/sound.js'),
    all = require('./routes/all.js'),
    twilio = require('./routes/twilio.js')(twilioClient);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
app.use('/api', light);
app.use('/api', temperature);
app.use('/api', sound);
app.use('/api', all);
app.use('/api', twilio);

// START THE SERVER
// =============================================================================
app.listen(port);