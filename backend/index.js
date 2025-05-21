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
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://semestra-seven.vercel.app',
        'https://semestra.vercel.app',
        'https://semestra-3y2l0hxqd-fatoumata-drammehs-projects.vercel.app',
        'https://semestra-git-main-fatoumata-drammehs-projects.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add a root route handler
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

// Add a health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

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
