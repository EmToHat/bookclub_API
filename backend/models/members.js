const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    activeReader: {
        type: String,
        required: true,
        enum: ["yes", "no"],
    },
    address: {
        street: {
        type: String,
        required: true,
        },
        city: {
        type: String,
        required: true,
        },
        state: {
        type: String,
        required: true,
        },
        postalCode: {
        type: String,
        required: true,
        },
    },
    favoriteGenres: {
        type: [String],
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

membersSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Members = mongoose.model("Members", membersSchema);

module.exports = Members;
