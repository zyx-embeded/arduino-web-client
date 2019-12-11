const express = require("express");

const bodyParser = require("body-parser");

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const config = require("./config/env").config;
const influx = require("./config/dbConfig").influx;

const sensorRoute = require("./routes/sensor");

const dataChart = require("./controller/dataChart").dataChart;
const deleteDb = require("./controller/dbController").deleteAllData;
const port = process.env.PORT;

app.set("view engine", "pug");

app.use(express.static("src"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

io.on("connection", function(socket) {
  socket.join("room-x");
  socket.on("ClientSent", function(msg) {
    setInterval(async function() {
      const data = await dataChart();
      socket.emit("ServerSent", data);
    }, 5000);
  });
});
app.use("/sensor", sensorRoute);

server.listen(port, async function() {
  await deleteDb();
  console.log(`Example app is running on ${port}`);
});
