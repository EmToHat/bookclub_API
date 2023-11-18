const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Bookclub API",
    description:
      "Web Services Team 2 - Alisson Inacio, Emilee Hatch, & Anna Varner",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
