const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    pseudo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('user', registerSchema);