var express = require('express'), // call express
    func = require('../functions.js');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    api.route('/light')

        .post(function(req, res) {
            console.log(req.body["toggle"]);
            func.toggleLED(req.body["toggle"]);
            res.json({"status": 200});
        })

        .get(function(req, res) {
            func.getLightSensor(res.json.bind(res));
        });

    return api;
})();