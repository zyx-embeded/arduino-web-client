const influx = require('../config/dbConfig').influx;

module.exports.checkDatabase = function() {
  influx
    .getDatabaseNames()
    .then(names => {
      if (!names.includes('arduino-web-server')) {
        return influx.createDatabase('arduino-web-server');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports.writeData = function(req, res, next) {
  const { temperature, humidity } = req.body;
  influx
    .writePoints(
      [
        {
          measurement: 'weather',
          tag: {
            sensor: 'DHT11',
            location: 'DaNang-VN'
          },
          fields: {
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity)
          }
        }
      ],
      {
        database: 'arduino-web-server',
        precision: 's'
      },
    
    )
    .then(()=>{
      res.status(200).json("write data success");
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports.getAllData = function(req, res) {
  influx
    .query('select * from weather')
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

//morgan 

//sentry 

//pm2


//
