const mongoose = require('mongoose');

QuoteSchma = new mongoose.Schema({
    quoteText: {
        type: String,
        required: [true, 'please add a quote ']
    },

    quoteAuthor: {
        type: String,
        required: [true, 'please add a author ']

    }
});


module.exports = mongoose.model('Quote', QuoteSchma);