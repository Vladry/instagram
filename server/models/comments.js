const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    commentedBy: {
        ref: 'Users',
        type: mongoose.Schema.Types.ObjectId
    },
    postId: {
        ref: 'Posts',
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    },

    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comments', commentSchema);