const mongoose = require("mongoose");

const dbConnect = async (url) => {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
      socketTimeoutMS: 45000, // Timeout for socket operations
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = dbConnect;
