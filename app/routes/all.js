/**
 * Created by Jan on 1/31/2015.
 */

function mergeJson(json1, json2) {
    for (var key in json2) {
        if (json2.hasOwnProperty(key) && !(key in json1)) {
            json1[key] = json2[key];
        }
    }
    return json1;
}

var express = require('express'),
    func = require('../functions.js');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    //sound route
    api.route('/allSensor')

        .get(function(req, res) {
            console.log("Sending all information");
//            res.send("TEST");
           func.getLightSensor(function(json0) {
                func.loudnessSensor(function (json1) {
                    func.getTempSensor(function (json2) {
                        var result = mergeJson(json0, json1);
                        result = mergeJson(result, json2);
                        try {
                            res.setHeader('Content-Type', 'application/json');
                            res.send({
                                sensor: [result]
                            });
                        }
                        catch(ex) {
                            console.log(ex);
                        }
                    });
                });
            });
        });

    return api;
})();