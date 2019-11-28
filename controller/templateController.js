const influx = require('../config/dbConfig').influx;
module.exports.drawChart = async function (req,res) {
    let seconds = new Date().getSeconds();
    let sensor= [[60,12,7],[70,16,8]];
    let data = await influx.query('select * from weather');

    for (const item of data) {
        sensor.push([Math.random()*100,item.humidity,item.temperature])
    }
    return res.render('chart.pug',{sensor:sensor});
};