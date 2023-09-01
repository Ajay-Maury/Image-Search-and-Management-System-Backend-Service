const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", imageRoutes);

// Add a route to display a "Server is running" message
app.get("/api", (req, res) => {
  res.json({ message: "Server is running" });
});

module.exports = app;
