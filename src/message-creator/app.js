'use strict';

const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
require('isomorphic-fetch');

const app = express();
const morgan = require('morgan');
app.use(bodyParser.json());

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
    res.send("Ping");
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
    request( { uri: publishUrl, method: 'POST', json: req.body } );
    res.sendStatus(200);
});

app.post('/api/invokerequest', function(req, res) {
    console.log("received new device request:");
    console.log(req.body);
    const publishUrl = `${daprUrl}/invoke/${invokeTarget}/method/receiverequest`;
    request( { uri: publishUrl, method: 'POST', json: req.body } );
    res.sendStatus(200);
});

app.post('/api/publishmessage', function(req, res) {
    console.log("received new device request:");
    console.log(req.body);
    const publishUrl = `${daprUrl}/publish/${pubsubName}/senddata`;
    request( { uri: publishUrl, method: 'POST', json: req.body } );
    res.sendStatus(200);
});

app.get('/ports', (_req, res) => {
    console.log("DAPR_HTTP_PORT: " + daprPort);
    console.log("DAPR_GRPC_PORT: " + daprGRPCPort);
    res.status(200).send({DAPR_HTTP_PORT: daprPort, DAPR_GRPC_PORT: daprGRPCPort })
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
