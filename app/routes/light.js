function getLightSensor(res) {
    var mraa = require('mraa'),
        light_sensor = new mraa.Aio(1),
        light_value = light_sensor.read();

    light_value = Math.round(light_value * .1);
    console.log("Light value is: " + light_value);
    res.json({
        light: light_value
    });

}

var express = require('express'); // call express

module.exports = (function() {
    'use strict';
    var api = express.Router();

    api.route('/light')

        .get(function(req, res) {
            getLightSensor(res);
        });

    return api;
})();