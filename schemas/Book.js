const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    commentcount: {
        type: Number,
        required: true,
        default: 0,
    },
    comments: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('books', BookSchema);