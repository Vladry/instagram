const Posts = require('../models/posts');
const Users = require('../models/users');
const Comments = require('../models/comments');

exports.userPostsPage = async (req, res) => {
    const userNick = req.params.userNick;
    const UserId = await Users.findOne({userNick: userNick}).exec();
    const posts = await Posts.find({postedBy: UserId});
    res.status(200).send(posts).end();
};

exports.getUserByUserNick = async (req, res) => {
    const userNick = req.params.userNick;
    const user = await Users.findOne({userNick: userNick}).exec();
    res.status(200).send(user).end();
};

exports.latestPostsFeed = async (req, res) => {
    const {lastDate, limit, actUserId} = req.params;
    const latest = await Posts.find({postedBy: {$ne: actUserId} }).sort({date: -1}).skip(Number(lastDate)).limit(Number(limit)).exec();
    // const latest = await Posts.find().sort({date: -1}).skip(Number(lastDate)).limit(Number(limit)).exec();
    res.status(200).send(latest).end();
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
