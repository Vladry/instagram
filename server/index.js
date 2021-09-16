const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');

dotenv.config();
const port = process.env.APP_PORT;
const app = express();

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());


const {
    getUserByUserNick,
    userPostsPage,
    onePostModalPage,
    latestPostsFeed,
    getuserLists,
    followUnfullowHandler,
    getUserById,
} = require('./route-handlers/user-handlers');
const {
    createOneNewPost,
    createManyNewPosts,
    createManyNewUsers,
    createManyNewComments,
    likeUnlikeComment,
    postComment,
} = require('./route-handlers/creation-handlers');


//DB creation:
app.post('/newpost/', createOneNewPost); //создает один документ в БД
app.post('/newposts/', createManyNewPosts); //создаёт целую коллекуию документов в БД
app.post('/newusers/', createManyNewUsers);
app.post('/newcomments/', createManyNewComments);

// retreivers:
app.get('/posts/:userNick', userPostsPage);
app.post('/posts/latest/', latestPostsFeed);

app.post('/post/', onePostModalPage);
app.get('/users/:userNick', getUserByUserNick); //получить объект юзера
app.get('/users_/:userId', getUserById);
app.post('/users/', getuserLists);
app.put('/users', followUnfullowHandler);
app.post('/comments/', postComment);
app.post('/post/likes', likeUnlikeComment);

const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, {useNewUrlParser: true})
    .then(
        async () => {
            app.listen(port, () => {
                console.log(`App is listening on port: ${port}`)
            })
        });
