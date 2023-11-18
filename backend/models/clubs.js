const mongoose = require("mongoose");

const bookclubSchema = new mongoose.Schema({
    clubName: {
        type: String,
        required: true,
    },
    host: {
        type: String,
        required: true,
    },
    participants: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
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

bookclubSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const bookClub = mongoose.model("BookClub", bookclubSchema);

module.exports = bookClub;
