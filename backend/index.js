const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dbConnect = require("./db");
const notesRouter=require('./routes/notesRoutes');
const userRoutes = require("./routes/userRoutes");
const newspaperRoutes = require("./routes/newspaperRoutes");
require("dotenv").config();
// Enable CORS for all routes
dbConnect("mongodb://127.0.0.1:27017/newsMania").then(
  console.log("db connected")
);

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// app.get("/api/headlines/:newspaperId", newspaperRoutes);
app.use("/api", newspaperRoutes);
app.use("/", userRoutes);
app.use('/notes',notesRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
