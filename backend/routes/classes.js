const router = require('express').Router();
const Class = require('../models/Class');
const auth = require('../middleware/auth');

// Get all classes for a user
router.get('/', auth, async (req, res) => {
    try {
        const classes = await Class.find({ userId: req.user.id });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new class
router.post('/', auth, async (req, res) => {
    try {
        const newClass = new Class({
            ...req.body,
            userId: req.user.id
        });
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a class
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedClass = await Class.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a class
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedClass = await Class.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single class by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const classData = await Class.findOne({
            _id: req.params.id,
            userId: req.user.id
        });
        
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        
        res.json(classData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;