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
        type: Number,
        default: 4.0
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
    }
}, {
    timestamps: true
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;