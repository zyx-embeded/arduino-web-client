const express = require('express');
require('./config/env').config;

const influx = require('./config/dbConfig').influx;
const sensorRoute = require('./routes/sensor');

const port = process.env.PORT;

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/sensor', sensorRoute);
app.listen(port, function() {
  console.log(`Example app is running on ${port}`);
});
