const router = require("express").Router();

const templateController = require("../controller/templateController");
const dbController = require("../controller/dbController");

router.get("/data", templateController.drawChart);
router.post("/", dbController.writeData);
module.exports = router;
