const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
    gallery: [{
        type: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Cms', cmsSchema);
