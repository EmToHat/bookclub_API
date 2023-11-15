// Import necessary packages and modules
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const dotenv = require("dotenv"); // Package for handling environment variables
dotenv.config(); // Load environment variables from .env file

let _db; // Variable to store the MongoDB connection instance

// Function to initialize the database connection
const initDb = async (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db); // If the database is already initialized, return the existing connection
  }

  try {
    const { MONGODB_URI } = require("./db.config"); // Importing variables from the config file
    await mongoose.connect(MONGODB_URI); // Connect to MongoDB using the provided URI
    _db = mongoose.connection; // Store the MongoDB connection instance
    callback(null, _db); // Execute the provided callback with the connection instance
    console.log("Db is initialized!");
  } catch (err) {
    callback(err); // If an error occurs during the connection, execute the callback with the error
  }
};

// Function to get the existing MongoDB connection instance
const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized"); // If the connection is not initialized, throw an error
  }
  return _db; // Return the existing connection instance
};

// Export the functions for external use
module.exports = {
  initDb,
  getDb,
};
