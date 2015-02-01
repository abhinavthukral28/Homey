/**
 * Created by Jan on 2/1/2015.
 */
var express = require('express'), // call express
    func = require('../functions.js');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    api.route('/lcd')

        .post(function(req, res) {
            console.log("Set LCD to: " + req.body["text"]);
            func.setLcd(req.body["text"]);
            res.json({"status": 200});
        })

    return api;
})();