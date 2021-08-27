const Posts = require('../models/posts');
const Users = require('../models/users');
const Comments = require('../models/comments');

exports.createManyNewPosts = async (req, res) => {
//https://masteringjs.io/tutorials/mongoose/create
//https://coderoad.ru/35488386/%D0%A0%D0%B0%D0%B7%D0%BC%D0%B5%D1%81%D1%82%D0%B8%D1%82%D0%B5-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2-JSON-%D0%BE%D0%B4%D0%BD%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE-%D1%81-Express-%D0%B8-Postman
    const {batch} = req.body;
    await Posts.create(batch, () => {
        res.status(201).send({batch})
    });
};

exports.createManyNewUsers = async (req, res) => {
    const {batch} = req.body;
    await Users.create(batch, () => {
        res.status(201).send({batch})
    });
};

exports.createManyNewComments = async (req, res) => {
    const {batch} = req.body;
    await Comments.create(batch, () => {
        res.status(201).send({batch})
    });
};

exports.createOneNewPost = async (req, res) => {
    const {postedBy, date, content, picture} = req.body;
    const newPost = new Posts({postedBy, date, content, picture});
    await newPost.save();
    res.status(201).send({newPost}).end();
};

exports.postComment = async (req, res) => {
    const {postId, comment, commentedBy} = req.body;
    const newComment = new Comments({postId, comment, commentedBy});
    await newComment.save();
    const postBeingUpdated = await Posts.findOne({_id: postId}).exec();
    // const newCommentFromDB = await Comments.findOne({comment: newComment.comment}).exec();
    // postBeingUpdated.comments.push(newCommentFromDB._id);
    postBeingUpdated.comments.push(newComment._id);
    await Posts.findOne({_id: postId}).updateOne(postBeingUpdated);
    // const updatedPost = await Posts.findOne({_id: postId}).exec();
    res.status(201).send(newComment).end();
    // console.log("newComment.postId, newComment.comment:", newComment.postId, newComment.comment);
    // res.status(201).send(updatedPost).end();
};

exports.likeUnlikeComment = async (req, res) => {
    // console.log("updateLikeStatus, ServerSide. Payload: ", req.body);
    const {postId, activeUserId} = req.body;
    const post = await Posts.findOne({_id: postId}).exec();
    const indx = post.likes.indexOf(activeUserId);
    if ( indx < 0 ) {
        post.likes.push(activeUserId);
    } else {
        post.likes.splice(indx, 1);
    }
    await post.save();
    res.status(202).send(post).end();
};
