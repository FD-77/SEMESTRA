const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const auth = require('../middleware/auth');

// Get class details by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const classDetail = await Class.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!classDetail) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json(classDetail);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update class details
router.put('/:id', auth, async (req, res) => {
    try {
        const {
            classNo,
            className,
            term,
            year,
            season,
            grade,
            professor,
            schedule,
            room,
            credits,
            bgColor
        } = req.body;

        const classDetail = await Class.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            {
                classNo,
                className,
                term,
                year,
                season,
                grade,
                professor,
                schedule,
                room,
                credits,
                bgColor
            },
            { new: true }
        );

        if (!classDetail) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json(classDetail);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete class
router.delete('/:id', auth, async (req, res) => {
    try {
        const classDetail = await Class.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!classDetail) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 