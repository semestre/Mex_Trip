const app = require("./app");
const connectDB = require("./config/database");

const PORT = 5000;

// Connect MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});