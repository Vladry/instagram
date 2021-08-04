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
app.use(BodyParser());

const {
    followNewContact,
    unfollowContact
} = require('./route-handlers/user-handlers');



const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, {useNewUrlParser: true})
    .then(
        async()=>{
        app.listen(port, ()=>{
            console.log(`App is listening on port: ${port}`)
        })
    });