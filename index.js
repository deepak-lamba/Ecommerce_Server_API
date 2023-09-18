'use strict';

require('dotenv').config({path: '.env'});

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

const mongoose = require('mongoose');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
var server = http.createServer(app);

// mongo_db server url stored in .env file as MONGODB_URL, update there if changing to another
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("connected to db, now starting server listen");

    // Initialize the Swagger middleware
    server.listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
})
.catch((err) => console.error(err));
