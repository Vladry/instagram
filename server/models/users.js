// создание моделей:   https://youtu.be/LlYs_1mBbt0
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userNick: {
        type: String,
        required: true
    },
    avatarSrc: {
        type: String,
        default: ''
    },
    addedByUsersID: [{
        type: String,
        default: ''
    }]
});

module.exports = mongoose.model("Users", userSchema);
