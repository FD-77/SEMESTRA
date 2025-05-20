const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all tasks for a class
router.get('/class/:classId', auth, async (req, res) => {
    try {
        const tasks = await Task.find({
            classId: req.params.classId,
            userId: req.user.id
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new task
router.post('/', auth, async (req, res) => {
    try {
        const { title, classId } = req.body;
        
        const task = new Task({
            title,
            classId,
            userId: req.user.id
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Toggle task completion status
router.patch('/:id/toggle', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.completed = !task.completed;
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 