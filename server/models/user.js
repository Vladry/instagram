const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    usernick: String,
    puctures: [{type: mongoose.Schema.Types.ObjectId, ref: "Picture"}],
    posts: [{title: String, Content: String, date: Date}],
});

module.exports = mongoose.model("User", UserSchema);
