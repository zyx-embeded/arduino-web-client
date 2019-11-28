const influx = require('../config/dbConfig').influx;
module.exports.drawChart = async function (req,res) {
    let seconds = new Date().getSeconds();
    let sensor= [];
    let data = await influx.query('select * from weather');
    await data;
    for (const item of data) {
        sensor.push([Math.random()*100,item.humidity,item.temperature])
    }
    return res.render('chart.handlebars',{ layout:false,sensor:sensor });
};