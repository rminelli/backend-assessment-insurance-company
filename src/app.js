const express = require('express')
const app = express();
const service_status = require('./status/status.js')

app.get('/', service_status.go);

module.exports = app;