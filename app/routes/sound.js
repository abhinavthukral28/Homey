/**
 * Created by Jan on 1/31/2015.
 */
function loudnessSensor(res) {
    var loudnessSensor = require('jsupm_groveloudness'),
        myLoudnessSensor = new loudnessSensor.GroveLoudness(2),
        loudness = myLoudnessSensor.value();

    console.log("Loudness value (higher is louder): " + loudness);
    res.json({
        message: loudness
    });
}

var express = require('express'); // call express

module.exports = (function() {
    'use strict';
    var api = express.Router();

    //sound route
    api.route('/sound')
        .post(function(req, res) {
            res.json({
                message: 'loudness post'
            })
        })
        .get(function(req, res) {
            console.log("Checking Loudness");
            loudnessSensor(res);
        });

    return api;
})();