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
    const latest = await Posts.find({postedBy: {$ne: activeUserId}, date: {$lt: lastDateISO}}).sort({date: -1}).limit(Number(limit)).exec();
    // const latest = await Posts.find({postedBy: {$ne: activeUserId}, date: {$lt:  lastDateISO  } }  ).sort({date: -1}).limit(Number(limit)).exec();
//строка ниже: находит посты НЕ содержащие ID текущего юзера, выбирает из них все датированные раньше lastDate, сортирует даты по
// убыванию и выдает limit-порциями :
    // const latest = await Posts.find({postedBy: {$ne: activeUserId}, date: {$lt: {$toDate: Number(lastDate)} }}).exec();
    // const latest = await Posts.find({postedBy: {$ne: activeUserId} }).sort({date: -1}).skip(Number(lastDate)).limit(Number(limit)).exec();
    res.status(200).send(latest).end();
};


exports.onePostModalPage = async (req, res) => {
    const {pictureSrc}  = req.body;
    const aPost = await Posts.findOne({picture: pictureSrc}).exec();
    const comments = await Comments.find({postId: aPost._id}).exec();
    res.send([aPost, comments]).end();
};


exports.getuserLists = async (req, res) => {
    const {activeUserId, limit, userType} = req.body;
    let userList;
    let amount = 0;
    if (userType === "followers") {
        /*получить всех с начала и, до заданного в skip количества:*/
        userList = await Users.find({_id: {$ne: activeUserId}, addedByUsersID: {$in: [activeUserId]}})
            .limit(Number(limit)).exec();

        amount = await Users.find({_id: {$ne: activeUserId}, addedByUsersID: {$in: [activeUserId]}}).countDocuments().exec();
    }
    if (userType === "recommended") {
        /*получить всех с начала и, до заданного в skip количества:*/
        userList = await Users.find({_id: {$ne: activeUserId}, addedByUsersID: {"$not": {$in: [activeUserId]}}})
            .limit(Number(limit)).exec();

        amount = await Users.find({_id: {$ne: activeUserId}, addedByUsersID: {"$not": {$in: [activeUserId]}}}).countDocuments().exec();
    }
    res.status(200).send([userList, amount]).end();
};

exports.followUnfullowHandler = async (req, res) => {
    const {contactNick, activeUserId} = req.body;

    const userBeingChanged = await Users.findOne({userNick: contactNick}).exec();
    const userFriendStatusArr = userBeingChanged.addedByUsersID;

    const index = userFriendStatusArr.indexOf(activeUserId);
    if (index < 0) {
        userFriendStatusArr.push(activeUserId);
    } else {
        userFriendStatusArr.splice(index, 1);
    }
    const updatedUser = await Users.findOne({userNick: contactNick}).update(userBeingChanged).exec();
    res.status(202).send(updatedUser).end();
}
;



exports.likeUnlikeComment = (req, res) => {

};
