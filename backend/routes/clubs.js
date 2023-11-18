const express = require("express");
const router = express.Router();

const clubsController = require("../controllers/clubs");

router.get("/", clubsController.getAllClubs);

router.get("/:id", clubsController.findClubById);

router.post("/", clubsController.addClub);

router.put("/:id", clubsController.updateClub);

router.delete("/:id", clubsController.deleteClub);

module.exports = router;
