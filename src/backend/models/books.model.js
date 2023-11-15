const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        enum: [
            "Historical Fiction",
            "Mystery",
            "Romance",
            "Poetry",
            "Action & Adventure",
            "Drama",
            "Fiction",
            "Non-Fiction",
            "Horror",
            "Short Story",
            "Biography",
            "Memoir",
            "Autobiography",
            "Dystopian",
            "Science Fiction",
            "Fantasy",
            "Thriller",
            "Graphic Novel"
            ],
        },
    category: {
        type: String,
        required: true,
        enum: ["Children", "Teens", "Young Adults", "Adults"],
    },
    pages: {
        type: Number,
    },
    year: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

bookSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
