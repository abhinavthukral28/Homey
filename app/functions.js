/**
 * Created by Jan on 1/31/2015.
 */
'use strict';
/*
 Function: getTempSensor(res)
 Parameters: res - response object
 Description: Read Temperature Sensor and send response
 */

var mraa = require('mraa'),
    tempSensor = new mraa.Aio(0),
    light_sensor = new mraa.Aio(1),
    loudnessSensor = require('jsupm_groveloudness'),
    myLoudnessSensor = new loudnessSensor.GroveLoudness(2),
    LCD = require('jsupm_i2clcd'),
    myLcd = new LCD.Jhd1313m1(0, 0x3E, 0x62);

module.exports.setLcd = function setLcd(callback) {
    myLcd.setCursor(0, 0);
    // RGB Blue
    //myLcd.setColor(53, 39, 249);
    // RGB Red
    myLcd.setColor(255, 255, 255);
    myLcd.setCursor(0, 1);
    myLcd.write('Edison Monitor');


};

module.exports.getTempSensor = function getTempSensor(callback) {
    'use strict';
    var B = 3975,
        a = tempSensor.read(),
        resistance = (1023 - a) * 10000 / a, //get the resistance of the sensor;
        celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15,
        fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;

    console.log("Centigrade Temperature: " + Math.round(celsius_temperature));
    callback({
        temperature: Math.round(celsius_temperature)
    });
};

module.exports.loudnessSensor = function loudnessSensor(callback) {
    var loudness = myLoudnessSensor.value();

    console.log("Loudness value (higher is louder): " + loudness);
    callback({
        sound: loudness
    });
};

module.exports.getLightSensor = function getLightSensor(callback) {
    var light_value = light_sensor.read();

    light_value = Math.round(light_value * .1);
    console.log("Light value is: " + light_value);
    callback({
        light: light_value
    });

};