const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classNo: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    grade: {
        type: String,  // Already String type, good
        default: null  // Changed from 'A' to null to show N/A by default
    },
    professor: {
        type: String,
        required: true
    },
    schedule: [{
        days: [String],
        startTime: String,
        endTime: String
    }],
    room: {
        type: String,
        required: true
    },
    credits: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: "bg-purple-200"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [{
        id: String,
        name: String,
        weight: Number
    }],
    assignments: [{
        id: String,
        name: String,
        category: String,
        grade: Number
    }],
    semesterGPA: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create a compound index for classNo and userId
classSchema.index({ classNo: 1, userId: 1 });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;