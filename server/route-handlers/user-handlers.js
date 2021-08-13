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
    const {lastDate, limit, activeUserId} = req.params;
    const lastDateNum = +lastDate;
    if (isNaN(lastDateNum)) return;
    const lastDateISO = new Date(Number(lastDate)).toISOString();
    const latest = await Posts.find({postedBy: {$ne: activeUserId}, date: {$lt:  lastDateISO  } }  ).sort({date: -1}).limit(Number(limit)).exec();
    // const latest = await Posts.find({postedBy: {$ne: activeUserId}, date: {$lt:  lastDateISO  } }  ).sort({date: -1}).limit(Number(limit)).exec();
//строка ниже: находит посты НЕ содержащие ID текущего юзера, выбирает из них все датированные раньше lastDate, сортирует даты по
// убыванию и выдает limit-порциями :
    // const latest = await Posts.find({postedBy: {$ne: activeUserId}, date: {$lt: {$toDate: Number(lastDate)} }}).exec();
    // const latest = await Posts.find({postedBy: {$ne: activeUserId} }).sort({date: -1}).skip(Number(lastDate)).limit(Number(limit)).exec();
    res.status(200).send(latest).end();
};
exports.onePostPage = async (req, res) => {
    const postId = req.params.postId;
    const aPost = await Posts.findOne({_id: postId}).exec();
    const comments = await Comments.find({postId: postId}).exec();
    res.send({aPost: aPost, comments: comments}).end();
};


exports.getuserLists = async (req, res) => {
    const {activeUserId, skip, limit, userType} = req.body;
    let userList;

    if (userType === "followers") {
        userList = await Users.find( { _id: {$ne: activeUserId}, addedByUsersID: {$in: [activeUserId]}})
            .skip(Number(skip)).limit(Number(limit)).exec();
    }

    if (userType === "recommended") {
        userList = await Users.find( { _id: {$ne: activeUserId}, addedByUsersID: {"$not": { $in: [activeUserId] }}   })
            .skip(Number(skip)).limit(Number(limit)).exec();
    }

    res.status(200).send(userList).end();
};


exports.followUnfullowHandler = (req, res) => {

};


exports.likeUnlikeComment = (req, res) => {

};
