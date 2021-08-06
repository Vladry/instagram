const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');

const Users = require('./models/users');
const Posts = require('./models/posts');
const Comments = require('./models/comments');

dotenv.config();
const port = process.env.APP_PORT;
const app = express();
// app.use(express.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());


const {
    homepage,
    userPostsPage,
    onePostPage,
    commentsPage,
    followUnfullowContact,
    likeUnlikeComment,
} = require('./route-handlers/user-handlers');
const {
    createOneNewPost,
    createManyNewPosts,
    createManyNewUsers,
    createManyNewComments
} = require('./route-handlers/creation-handlers');

app.post('/newpost/', createOneNewPost); //создает один документ в БД
app.post('/newposts/', createManyNewPosts); //создаёт целую коллекуию документов в БД
app.post('/newusers/', createManyNewUsers);
app.post('/newcomments/', createManyNewComments);
app.get('/posts/:userID', userPostsPage);

const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, {useNewUrlParser: true})
    .then(
        async () => {
            app.listen(port, () => {
                console.log(`App is listening on port: ${port}`)
            })
        });
