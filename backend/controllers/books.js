// controllers/books.js
const mongodb = require("../database/connection");
const Book = require("../models/books.js");
const ObjectId = require("mongodb").ObjectId;

// Get all books from the "books" collection
const getAllBooks = async (req, res) => {
    try {
        // Initialize the database
        await mongodb.initDb();

        const db = mongodb.getDb();
        const booksCollection = db.collection("books");
        const books = await booksCollection.find().toArray();

        res.json(books);
    } catch (error) {
        console.error("Error getting books:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Get book by ID
const findBookById = async (req, res) => {
    try {
        // Initialize the database
        await mongodb.initDb();

        const db = mongodb.getDb();
        const booksCollection = db.collection("books");

        const bookId = new ObjectId(req.params.id);

        if (!bookId) {
        res.status(400).send({ message: "Book ID cannot be empty!" });
        return;
        }

        const response = await booksCollection.findOne({ _id: bookId });

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(response);
    } catch (error) {
        console.error("Error finding book by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get book by Title
const findBookByTitle = async (req, res) => {
    try {
        const bookTitle = req.params.title;
        if (!bookTitle) {
        res.status(400).send({ message: "Book Title cannot be empty!" });
        return;
        }

        const response = await mongodb
        .getDb()
        .collection("books")
        .findOne({ title: bookTitle });

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(response);
    } catch (error) {
        console.error("Error finding book by title:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get books by Author
const findBookByAuthor = async (req, res) => {
    try {
        const bookAuthor = req.params.author;
        if (!bookAuthor) {
        res.status(400).send({ message: "Author cannot be empty!" });
        return;
        }

        const response = await mongodb
        .getDb()
        .collection("books")
        .find({ author: bookAuthor })
        .toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(response);
    } catch (error) {
        console.error("Error finding books by author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new book
const addBook = async (req, res) => {
    try {
        const bookData = req.body;
        const newBook = new Book(bookData);
        await newBook.save();
        res.status(201).json(newBook); // Respond with the created Book
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const updatedBookData = req.body;
        const response = await mongodb
        .getDb()
        .collection("books")
        .updateOne({ _id: bookId }, { $set: updatedBookData });

        if (response.modifiedCount > 0) {
        res.status(204).send();
        } else {
        res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb
        .getDb()
        .collection("books")
        .deleteOne({ _id: bookId });

        if (response.deletedCount > 0) {
        res.status(204).send();
        } else {
        res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllBooks,
    findBookById,
    findBookByTitle,
    findBookByAuthor,
    addBook,
    updateBook,
    deleteBook,
};
