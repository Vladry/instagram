const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');

dotenv.config();
// const port = process.env.APP_PORT;  //так пропишем сами порт из файла .env
const port = process.env.PORT || 8000;   //а так получим порт от heroku через Node environment

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(BodyParser.urlencoded({extended: true}));

app.use(BodyParser.json());   // это вместо:  app.use(express.json());

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
app.get('/posts/:userNick', userPostsPage); //получить все посты указанного юзера
app.post('/posts/latest/', latestPostsFeed);
app.post('/post/', onePostModalPage);
app.get('/users/:userNick', getUserByUserNick); //получить объект юзера
app.get('/users_/:userId', getUserById);
app.post('/users/', getuserLists);
app.put('/users', followUnfullowHandler);
app.post('/comments/', postComment);
app.post('/post/likes', likeUnlikeComment);

app.get('*', (req, res)=> {
    res.sendFile(__dirname + 'public/index.html');
});

const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, {useNewUrlParser: true})
    .then(
        async () => {
            app.listen(port, () => {
                console.log(`App is listening on port: ${port}`)
            })
        });
