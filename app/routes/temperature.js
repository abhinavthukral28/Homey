/**
 * Created by Jan on 1/31/2015.
 */
/*
 Function: getTempSensor(res)
 Parameters: res - response object
 Description: Read Temperature Sensor and send response
 */
function getTempSensor(res) {
    'use strict';
    var mraa = require('mraa'),
        tempSensor = new mraa.Aio(0), //temperature
        a = tempSensor.read(),
        resistance = (1023 - a) * 10000 / a, //get the resistance of the sensor;
        celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15,
        fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;

    console.log("Analog Pin (A0) Output: " + a);
    console.log("Fahrenheit Temperature: " + fahrenheit_temperature);
    res.json({
        temperature: fahrenheit_temperature
    });
}

var express = require('express'); // call express

module.exports = (function() {
    'use strict';
    var api = express.Router();

    //sound route
    api.route('/temperature')
        // temperature toggle
        .post(function(req, res) {

            //insert code to toggle temperature control
            res.json({
                message: 'temperature post!'
            })

        })

        //temperature get
        .get(function(req, res) {
            getTempSensor(res);
            //insert code to return temperature data

        });

    return api;
})();

