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
    },
    fullName: { // опционально тут его ФИО
        type: String,
        required: false
    },
    //и ссылка на все его посты
    posts: [{ref: "Posts", type: mongoose.Schema.Types.ObjectId}], //ссылки на объекты в коллекции Posts

});

module.exports = mongoose.model("Users", userSchema);
