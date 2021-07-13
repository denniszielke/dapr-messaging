'use strict';

const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const OS = require('os');
require('isomorphic-fetch');

const app = express();
const morgan = require('morgan');
app.use(bodyParser.json());

const version = process.env.VERSION;

var startDate = new Date();
var month = (((startDate.getMonth()+1)<10) ? '0' + (startDate.getMonth()+1) : (startDate.getMonth()+1));
var day = (((startDate.getDate())<10) ? '0' + (startDate.getDate()) : (startDate.getDate()));
var hour = (((startDate.getHours())<10) ? '0' + (startDate.getHours()) : (startDate.getHours()));
var minute = (((startDate.getMinutes())<10) ? '0' + (startDate.getMinutes()) : (startDate.getMinutes()));
var seconds = (((startDate.getSeconds())<10) ? '0' + (startDate.getSeconds()) : (startDate.getSeconds()));
var logDate = month+  "-" + day + " " + hour + ":" + minute + ":" + seconds; 

// These ports are injected automatically into the container.
const daprGRPCPort = process.env.DAPR_GRPC_PORT;
const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 3000;
const pubsubName = 'dzpubsub';
const invokeTarget = 'message-filter';

app.use(morgan('dev'));
var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

app.get('/ping', function(req, res) {
    console.log('received ping');
    var sourceIp = req.connection.remoteAddress;
    var pong = { response: "pong!", host: OS.hostname(), sourceip: sourceIp, version: version };
    console.log(pong);
    res.send(pong);
});

app.get('/healthz', function(req, res) {
    res.send('OK');
});

app.get('/api/getversion', function(req, res) {
    console.log('received version');
    var response = "Started: " + logDate + ", host: " + OS.hostname() + ", version: " + version;
    console.log(response);
    res.send(response);
});

app.post('/api/getname', (_req, res) => {
    const names = [ "Peter", "Steve", "Bill", "Dave", "Tom", "Tim", "Dale", "Ben", "Andy", "Mike", "Anne", "Cat", "Maria", "Lucy", "Kye", "Paula", "Lena", "Kelly", "Ringo", "Matt"];
    var name = names[Math.floor(Math.random() * names.length)];
    res.send(name);
});

app.post('/api/newdevice', function(req, res) {
    console.log("received new device request:");
    console.log(req.body);
    const publishUrl = `${daprUrl}/publish/${pubsubName}/newdevice`;
    request( { uri: publishUrl, method: 'POST', json: req.body }, function (error, response, body) {
        if (error) {
          return console.error('new device registration failed:', error);
        }
        console.log('device registration successfull', body);
      });
    res.sendStatus(200);
});

app.post('/api/invokerequest', function(req, res) {
    console.log("received new device request:");
    console.log(req.body);
    const publishUrl = `${daprUrl}/invoke/${invokeTarget}/method/receiverequest`;
    request( { uri: publishUrl, method: 'POST', json: req.body }, function (error, response, body) {
        if (error) {
            return console.error('invoke request failed:', error);
          }
          console.log('invoke request successfull', body);
      });
    res.sendStatus(200);
});

app.post('/api/publishmessage', function(req, res) {
    console.log("received new device request:");
    console.log(req.body);
    const publishUrl = `${daprUrl}/publish/${pubsubName}/senddata`;
    request( { uri: publishUrl, method: 'POST', json: req.body } , function (error, response, body) {
        if (error) {
            return console.error('public message failed:', error);
          }
          console.log('public message successfull', body);
      });
    res.sendStatus(200);
});

app.get('/ports', (_req, res) => {
    console.log("DAPR_HTTP_PORT: " + daprPort);
    console.log("DAPR_GRPC_PORT: " + daprGRPCPort);
    res.status(200).send({DAPR_HTTP_PORT: daprPort, DAPR_GRPC_PORT: daprGRPCPort })
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
