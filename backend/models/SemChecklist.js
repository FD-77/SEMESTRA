const mongoose = require('mongoose');

const semChecklistSchema = new mongoose.Schema({
    taskname: {
        type: String, 
        required: true, 
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const SemChecklist = mongoose.model('SemTask', semChecklistSchema);

module.exports = SemChecklist;