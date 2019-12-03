const influx = require("../config/dbConfig").influx;

module.exports.dataChart = async function() {
  let dataChart = [];
  let data = await influx.query("select * from weather");

  for (const item of data) {
    dataChart.push([10, item.temperature, item.humidity]);
  }
  return dataChart;
};
