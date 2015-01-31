var express = require('express'), // call express
    func = require('../functions.js');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    api.route('/light')

        .get(function(req, res) {
            func.getLightSensor(res.json);
        });

    return api;
})();