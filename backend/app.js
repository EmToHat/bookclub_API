// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

//importing routes
const indexRoutes = require("./routes/index");

app.use(cors());
app.use(express.json());

app
  .use("/api-docs", swaggerUi.serve)
  .use("/api-docs", swaggerUi.setup(swaggerDocument));

app.use("/", indexRoutes);

// Oauth Code
const { auth, requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});
//end oauth code


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Middleware for handling undefined routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
