const influx = require('../config/dbConfig').influx;
module.exports.drawChart = async function (req,res) {
    return res.render('chart.pug');
};
