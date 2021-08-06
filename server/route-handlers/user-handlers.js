const Posts = require('../models/posts');
const Users = require('../models/users');
const Comments = require('../models/comments');

exports.homepage = () => {

};
exports.userPostsPage = async (req, res) => {
    const userNick = req.params.userNick;
    const UserId = await Users.findOne({userNick: userNick}).exec();
    const posts = await Posts.find({postedBy: UserId});
    res.status(200).send({posts}).end();
};


exports.onePostPage = async (req, res) => {
    const postId = req.params.postId;
    const aPost = await Posts.findOne({_id: postId}).exec();
    const comments = await Comments.find({postId: postId}).exec();
    res.send({aPost: aPost, comments: comments}).end();
};


exports.followUnfullowContact = (req, res) => {

};
exports.likeUnlikeComment = (req, res) => {

};
