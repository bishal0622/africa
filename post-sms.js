module.exports = function(msg) {
    var http = require('http');
    var express = require('express');
    var transferApi = require('./transferCheck');
    var bodyParser = require('body-parser');
    var splitBody = require('./splitBody');
    var sendSms = require('./send-sms');
    var checkSyntax = require('./checkSyntax');
    var apiCheck = require('./apiCheck');

    var app = express();

    // var flag = false;
    //use of express
    app.use(bodyParser.urlencoded({ extended: false }));

    //post sms to server
    app.post('/sms', function(req, res) {
       console.log(req);

    //     // console.log(req.body.Body);
    //     console.log(req.body);
    //     //splitting the body part
    //     var splitting = splitBody(req.body.Body);

    //     //Phone number sms is sent from
    //     var from = req.body.From;

    //     //checking syntax
    //     var index = checkSyntax(req.body.Body);

    //     //index 0 to balance inquiry after checkSyntax
    //     if (index == 0) {
    //         console.log('balance inquiry');
    //         //Function balance inquiry
    //         apiCheck(from, req.body.Body);
    //         // sendSms('balance inquiry', from);

    //     } else if (index == 1) {
    //         //index 1 to balance transfer after checkSyntax
    //         console.log('Transfer');
    //         console.log("Amount : " + splitting[1]);
    //         console.log("Username " + splitting[2]);
    //         //Function balance transfer
    //         transferApi(from,splitting[1],splitting[2]);
    //         // flag = apiCheck(app, from, req.body.Body);
    //         // sendSms('balance transfered', from);

    //     } else {
    //         console.log("invalid syntax");
    //         //Function error

    //         sendSms('invalid Syntax', from);
    //     }

    //     // twiml.message(msg);
    //     res.writeHead(200, { 'Content-Type': 'text/xml' });
    //     res.end(twiml.toString());
    });

    http.createServer(app).listen(process.env.PORT, function() {
        // console.log("Express server listening on port 1337");
    });


}