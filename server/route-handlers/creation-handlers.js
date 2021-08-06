const Posts = require('../models/posts');
const Users = require('../models/users');
const Comments = require('../models/comments');

exports.createManyNewPosts = async (req, res) => {
//https://masteringjs.io/tutorials/mongoose/create
//https://coderoad.ru/35488386/%D0%A0%D0%B0%D0%B7%D0%BC%D0%B5%D1%81%D1%82%D0%B8%D1%82%D0%B5-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2-JSON-%D0%BE%D0%B4%D0%BD%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE-%D1%81-Express-%D0%B8-Postman
    const {batch} = req.body;
    await Posts.create(batch, ()=>{res.status(201).send({batch})});
};

exports.createManyNewUsers = async (req, res) => {
    const {batch} = req.body;
    await Users.create(batch, ()=>{res.status(201).send({batch})});
};

exports.createManyNewComments = async (req, res) => {
    const {batch} = req.body;
    await Comments.create(batch, ()=>{res.status(201).send({batch})});
};

exports.createOneNewPost = async (req, res) => {
    const {postedBy, date, content, picture} = req.body;
    const newPost = new Posts({postedBy, date, content, picture});
    await newPost.save();
    res.status(201).send({newPost}).end();
};

