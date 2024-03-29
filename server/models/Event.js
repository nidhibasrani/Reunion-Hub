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
        // required: true
    },
    gallery : [{
        type : String,
        
    }],
    date: {
        type: Date,
        default : Date.now()
    },

});


module.exports = mongoose.model('Event', eventSchema);