const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const auth = require("./routes/auth.routes");
const locations = require("./routes/location.routes");
const cars = require("./routes/car.routes");
const destinations = require("./routes/destination.routes");
const products = require("./routes/product.routes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth);
app.use("/api/locations", locations);
app.use("/api/cars", cars);
app.use("/api/destinations", destinations);
app.use("/api/products", products);

// Error middleware MUST be last
app.use(errorHandler);

module.exports = app;