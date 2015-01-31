/**
 * Created by Jan on 1/31/2015.
 */
var express = require('express'), // call express
    func = require('../functions.js');

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
            func.loudnessSensor(res.json.bind(res));
        });

    return api;
})();