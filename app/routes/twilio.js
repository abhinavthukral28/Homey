/**
 * Created by Jan on 1/31/2015.
 */
var express = require('express');

module.exports = (function() {
    'use strict';
    var api = express.Router();

    api.route('/twilio')

        .post(function(req, res) {
            
        });

    return api;
})();