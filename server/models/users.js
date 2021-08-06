// создание моделей:   https://youtu.be/LlYs_1mBbt0
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userNick: { //ник пользователя
        type: String,
        required: true
    },
    avatarSrc: { //ссылка на его аватарку
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Users", userSchema);
