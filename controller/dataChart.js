const influx = require("../config/dbConfig").influx;
const serverDate = new Date();
const serverMin = serverDate.getMinutes();
const serverSeconds = serverDate.getSeconds();

module.exports.dataChart = async function() {
  let dataChart = [];
  let data = await influx.query("select * from  weather");

  for (const item of data) {
    dataChart.push([
      -serverMin * 60 -
        serverSeconds +
        item.time.getMinutes() * 60 +
        item.time.getSeconds(),
      item.humidity,
      item.temperature
    ]);
  }
  return dataChart;
};
