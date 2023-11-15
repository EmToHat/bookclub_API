// Load environment variables from the .env file
require("dotenv").config();

// Export an object containing MongoDB URI and PORT from environment variables
module.exports = {
    MONGODB_URI: process.env.MONGODB_URI, // MongoDB URI retrieved from environment variables
    PORT: process.env.PORT, // Port number retrieved from environment variables
};
