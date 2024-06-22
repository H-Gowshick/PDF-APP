const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors"); // Import the cors package
const connectDB = require("./connection"); // Import the MongoDB connection function
const adminRouter = require("./routes/adminRouter"); // Import the pdfRouter
const userRouter = require("./routes/userRouter");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use the pdfRouter for routes starting with /pdf
app.use("/pdf", adminRouter);
app.use("/pdf", userRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
