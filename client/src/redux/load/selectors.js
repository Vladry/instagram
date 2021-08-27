const getActiveUserPosts = state => state.loadReducer.activeUserPosts;
const getActiveUser = state => state.loadReducer.activeUser;
const getUpdatedUser = state => state.loadReducer.updatedUser;
const getModalIsOpen = state => state.loadReducer.modalIsOpen;
const getPost = state => state.loadReducer.aPost;


const getComments = state => state.loadReducer.comments;
const getNewCommentObj = state => state.loadReducer.newCommentObj;
const getaUser = state => state.loadReducer.aUser;

export default {
    getActiveUserPosts,
    getActiveUser,
    getUpdatedUser,
    getPost,
    getComments,
    getaUser,
    getModalIsOpen,
    getNewCommentObj,
}