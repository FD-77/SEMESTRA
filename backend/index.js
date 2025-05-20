const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const authRoutes = require("./routes/auth");
const classRoutes = require("./routes/classes");
const mainRoutes = require("./routes/mainPage")
const profileRoutes = require("./routes/profile");
const classDetailRoutes = require("./routes/classDetail");
const taskRoutes = require("./routes/tasks");
const semestersRoutes = require('./routes/semesters');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/mainPage", mainRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/class-detail", classDetailRoutes);
app.use("/api/tasks", taskRoutes);
app.use('/api/semesters', semestersRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
