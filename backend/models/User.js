const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password_hash: {
        type: String,
        required: true
    },
    school: {
        type: String,
        trim: true
    },
    gpa: {
        type: Number,
        min: 0,
        max: 4.0
    },
    major: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;