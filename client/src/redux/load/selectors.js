const getAllUsersPosts = state => state.loadReducer.allUsersPosts;
const getCurrentUserPosts = state => state.loadReducer.currentUserPosts;
const getActiveUser = state => state.loadReducer.activeUser;
const getCurrentUser = state => state.loadReducer.currentUser;
const getUpdatedUser = state => state.loadReducer.updatedUser;

const getModalIsOpen = state => state.loadReducer.modalIsOpen;
const getPost = state => state.loadReducer.aPost;
const getComments = state => state.loadReducer.comments;

const getaUser = state => state.loadReducer.aUser;

const getNewCommentObj = state => state.loadReducer.newCommentObj;
const getChangedPost = state => state.loadReducer.changedPost;

export default {
    getAllUsersPosts,
    getCurrentUserPosts,
    getActiveUser,
    getCurrentUser,
    getUpdatedUser,
    getPost,
    getComments,
    getaUser,
    getModalIsOpen,
    getNewCommentObj,
    getChangedPost,
}