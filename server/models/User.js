const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true,

    },
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    enrollmentNumber: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],


}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)


