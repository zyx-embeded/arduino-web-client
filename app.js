const express = require('express');
const exphbs = require('express-handlebars');

const config = require('./config/env').config;

const influx = require('./config/dbConfig').influx;
const sensorRoute = require('./routes/sensor');

const port = process.env.PORT;

const app = express();

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

app.use(express.static('src'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/sensor', sensorRoute);

app.get('/',function (req,res) {
  console.log('Connected');
  res.json('Success')
})

app.listen(port, function() {
  console.log(`Example app is running on ${port}`);
});
