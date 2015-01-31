var B = 3975;
var mraa = require("mraa");

//GROVE Kit A0 Connector --> Aio(0)
var myAnalogPin = new mraa.Aio(0);

/*
 Function: startSensorWatch(socket)
 Parameters: socket - client communication channel
 Description: Read Temperature Sensor and send temperature in degrees of Fahrenheit every 4 seconds
 */
function startSensorWatch(res) {
    'use strict';
    setInterval(function () {
        var a = myAnalogPin.read();
        console.log("Analog Pin (A0) Output: " + a);
        //console.log("Checking....");

        var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
        //console.log("Resistance: "+resistance);
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
        //console.log("Celsius Temperature "+celsius_temperature);
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
        console.log("Fahrenheit Temperature: " + fahrenheit_temperature);
        res.json({ message: 'temperature get: ' + fahrenheit_temperature });
    }, 4000);
}

console.log("Sample Reading Grove Kit Temperature Sensor");

var port = process.env.PORT || 8080;        // set our port

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

router.route('/temperature')

    // temperature toggle
    .post(function(req, res) {

        //insert code to toggle temperature control
        res.json({ message: 'temperature post!' })

    })

    //temperature get
    .get(function(req, res) {
        console.log("Sensor watch begin");
        startSensorWatch(res);
        //insert code to return temperature data

    });


//Attach a 'connection' event handler to the server
//io.sockets.on('connection', function (socket) {
//    'use strict';
//    console.log('a user connected');
//    //Emits an event along with a message
//    socket.emit('connected', 'Welcome');
//
//    //Start watching Sensors connected to Galileo board
//    startSensorWatch(socket);
//
//    //Attach a 'disconnect' event handler to the socket
//    socket.on('disconnect', function () {
//        console.log('user disconnected');
//    });
//});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);