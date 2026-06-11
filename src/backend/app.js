const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const auth = require("./routes/auth.routes");
const locations = require("./routes/location.routes");
const shapes = require("./routes/shape.routes");
const products = require("./routes/product.routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth);
app.use("/api/locations", locations);
app.use("/api/shapes", shapes);
app.use("/api/products", products);

module.exports = app;