const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema({
    link : {
        required: true,
        type: 'string'
    },
    header : {
        required: true,
        type: 'string'
    },
    prevHeader : {
        required: true,
        type: 'string'
    }
})

module.exports = mongoose.model('Link', linksSchema);