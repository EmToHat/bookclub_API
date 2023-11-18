const express = require("express");
const router = express.Router();

const booksRoute = require("./books");
const clubsRoute = require("./clubs");
const meetingsRoute = require("./meetings");
const membersRoute = require("./members");

const swagger = require("./swagger");

router.use("/books", booksRoute);

router.use("/clubs", clubsRoute);

router.use("/meetings", meetingsRoute);

router.use("/members", membersRoute);

router.use("/", swagger);

module.exports = router;
