const mongoose = require("mongoose");
const Book = require("./books.model.js");
const BookClub = require("./clubs.model.js");

const meetingSchema = new mongoose.Schema({
    bookClub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookClub', // Reference to the BookClub model
        required: true,
    },
    host: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        },
    dayOfWeek: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    location: {
        type: String,
        required: true,
    },
    typeOfMeeting: {
        type: String,
        required: true,
        enum: ["in-person", "online"]
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to the Book model
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

meetingSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Meeting = mongoose.model("Meetng", meetingSchema);

module.exports = Meeting;
