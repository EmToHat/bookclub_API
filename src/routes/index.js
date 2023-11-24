const express = require("express");
const router = express.Router();



const baseController = require("../controllers/index");
router.get("/", baseController.greeting);

router.use("/books", require("./books"));
router.use("/clubs", require("./clubs"));
router.use("/meetings", require("./meetings"));
router.use("/members", require("./members"));

module.exports = router;