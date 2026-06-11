const app = require("./app");
const connectDB = require("./config/database");

const PORT = 3000;

// Connect MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});