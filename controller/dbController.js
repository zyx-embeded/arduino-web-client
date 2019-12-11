const influx = require("../config/dbConfig").influx;

module.exports.checkDatabase = function() {
  influx
    .getDatabaseNames()
    .then(names => {
      if (!names.includes("arduino-web-server")) {
        return influx.createDatabase("arduino-web-server");
      }
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports.writeData = async function(req, res, next) {
  try {
    const { temperature, humidity } = req.body;
    await influx.writePoints(
      [
        {
          measurement: "weather",
          tag: {
            sensor: "DHT11",
            location: "DaNang-VN"
          },
          fields: {
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity)
          }
        }
      ],
      {
        database: "arduino-web-server",
        precision: "s"
      }
    );
    res.status(200).json("Write data into db success");
    return;
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllData = async function(req, res) {
  try {
    let data = await influx.query("select * from weather");
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteAllData = async function() {
  try {
    let drop = await influx.dropMeasurement("weather");
  } catch (error) {
    console.log(error);
  }
};
