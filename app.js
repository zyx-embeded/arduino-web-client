const express = require("express");

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const config = require("./config/env").config;
const influx = require("./config/dbConfig").influx;
const sensorRoute = require("./routes/sensor");

const dataChart = require("./controller/dataChart").dataChart;
const port = process.env.PORT;

app.set("view engine", "pug");

app.use(express.static("src"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

io.on("connection", function(socket) {
  socket.on("ClientSent", async function(msg) {
    const data = await dataChart();
    socket.emit("ServerSent", data);
  });
});

app.use("/sensor", sensorRoute);

server.listen(port, function() {
  console.log(`Example app is running on ${port}`);
});
