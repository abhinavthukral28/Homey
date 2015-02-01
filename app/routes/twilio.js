/**
 * Created by Jan on 1/31/2015.
 */
var express = require('express');

module.exports = (function(twilioClient) {
    'use strict';
    var api = express.Router();

    api.route('/twilio')

        .post(function(req, res) {
            console.log(req.body);
            twilioClient["enabled"] = req.body["twilioFlag"];
            if (twilioClient["enabled"]) {
                twilioClient["to"] = req.body["phone"];
                console.log(twilioClient["to"]);
                twilioClient["client"].messages.create({
                    body: "This is your homey, Eddie, texting you!",
                    to: twilioClient["to"],
                    from: twilioClient["from"]
                }, function(err, message) {
                    console.log("error message: " + JSON.stringify(err));
                });
            }
        });



    return api;
});