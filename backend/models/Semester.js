const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    semesterGPA: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;