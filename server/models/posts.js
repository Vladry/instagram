const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postedBy: {
        ref: 'User',
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

    likes: [{ref: "User", type: mongoose.Schema.Types.ObjectId}],

    comments: [{ref: 'Comments', type: mongoose.Schema.Types.ObjectId}],


});

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;