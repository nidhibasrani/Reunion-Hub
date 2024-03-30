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
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]

});


module.exports = mongoose.model('Event', eventSchema);