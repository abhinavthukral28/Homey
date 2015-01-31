/**
 * Created by Jan on 1/31/2015.
 */
var express = require('express'), // call express
    func = require('../functions.js');

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
            func.getTempSensor(res.json);
            //insert code to return temperature data

        });

    return api;
})();

