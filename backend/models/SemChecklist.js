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
    timestamps: true,
    collection: 'semtasks'
});

const SemChecklist = mongoose.model('SemChecklist', semChecklistSchema);

module.exports = SemChecklist;
