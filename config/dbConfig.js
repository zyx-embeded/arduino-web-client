const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'arduino-web-server',
  schema: [
    {
      measurement: 'weather',
      fields: {
        temperature: Influx.FieldType.FLOAT,
        humidity: Influx.FieldType.FLOAT
      },
      tags: [ 'sensor', 'location' ]
    }
  ],
  port: 8086
});

module.exports = { influx };
