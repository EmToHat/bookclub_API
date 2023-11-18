// meetings.js
const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meetings");

router.get("/", meetingsController.getAllMeetingDetails);

router.get("/:id", meetingsController.getMeetingDetailsById);

router.post("/", meetingsController.createMeetingDetails);

router.put("/:id", meetingsController.updateMeetingDetails);

router.delete("/:id", meetingsController.deleteMeetingDetails);

module.exports = router;
