const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postedBy: {
        ref: 'Users',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    content: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: true
    },

    likes: [{ref: "Users", type: mongoose.Schema.Types.ObjectId}],

    comments: [{ref: 'Comments', type: mongoose.Schema.Types.ObjectId}],


});

module.exports = mongoose.model('Posts', postSchema);
