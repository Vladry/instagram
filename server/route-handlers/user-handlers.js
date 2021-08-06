const Posts = require('../models/posts');
const Users = require('../models/users');
const Comments = require('../models/comments');

exports.homepage = () => {

};
exports.userPostsPage = async (req, res) => {
    const postedBy = req.params.userID;
    res.status(200).send(postedBy).end();

    const posts = await Posts.find();
    console.log(posts);
    res.status(200).send({posts}).end();
};


exports.onePostPage = () => {

};
exports.commentsPage = () => {

};
exports.followUnfullowContact = () => {

};
exports.likeUnlikeComment = () => {

};
