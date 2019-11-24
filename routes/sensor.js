const router = require('express').Router();
const dbController = require('../controller/dbController');

router.get('/data', dbController.getAllData);
router.post('/', dbController.writeData);

module.exports = router;
