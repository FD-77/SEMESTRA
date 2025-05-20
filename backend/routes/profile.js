const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Class = require('../models/Class');
const auth = require('../middleware/auth');

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password_hash');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/', auth, async (req, res) => {
    try {
        const { username, email, school, gpa, major, phone } = req.body;
        
        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ],
            _id: { $ne: req.user.id }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, email, school, gpa, major, phone },
            { new: true }
        ).select('-password_hash');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's classes
router.get('/classes', auth, async (req, res) => {
    try {
        const classes = await Class.find({ userId: req.user.id });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user's GPA
router.put('/gpa', auth, async (req, res) => {
    try {
        const { gpa } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { gpa: parseFloat(gpa) },
            { new: true }
        );
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ gpa: user.gpa });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get user's GPA
router.get('/gpa', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('gpa');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ gpa: user.gpa || 'N/A' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;