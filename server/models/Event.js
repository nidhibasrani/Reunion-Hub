const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    gallery : [{
        type : String,
        
    }],
    date: {
        type: Date,
        required: true
    },

});


module.exports = mongoose.model('Event', eventSchema);