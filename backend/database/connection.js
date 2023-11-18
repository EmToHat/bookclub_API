// db.connection.js
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

let _db;

const initDb = async () => {
    if (_db) {
        console.log("Db is already initialized!");
        return _db;
    }

    try {
        await mongoose.connect(MONGODB_URI);
        _db = mongoose.connection;
        console.log("Db is initialized!");
        return _db;
    } catch (err) {
        console.error("Error initializing database:", err);
        throw err;
    }
};

const getDb = () => {
    if (!_db) {
        throw Error("Db not initialized");
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};
