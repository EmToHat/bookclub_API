// routes/books.js
const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

router.get("/", booksController.getAllBooks);

router.get("/:id", booksController.findBookById);

router.get("/title/:title", booksController.findBookByTitle); // Updated route

router.get("/author/:author", booksController.findBookByAuthor); // Updated route

router.post("/", booksController.addBook);

router.put("/:id", booksController.updateBook);

router.delete("/:id", booksController.deleteBook);

module.exports = router;
