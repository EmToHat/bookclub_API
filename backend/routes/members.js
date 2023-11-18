const express = require("express");
const router = express.Router();
const membersController = require("../controllers/members");

router.get("/", membersController.getAllMembers);

router.get("/:id", membersController.getMemberById);

router.post("/", membersController.createMember);

router.put("/:id", membersController.updateMember);

router.delete("/:id", membersController.deleteMember);

module.exports = router;
