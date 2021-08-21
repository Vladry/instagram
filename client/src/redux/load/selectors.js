const getActiveUserPosts = state => state.loadReducer.activeUserPosts;
const getActiveUser = state => state.loadReducer.activeUser;
const getUpdatedUser = state => state.loadReducer.updatedUser;


const getPost = state => state.loadReducer.aPost;
const getComments = state => state.loadReducer.comments;

export default {
    getActiveUserPosts,
    getActiveUser,
    getUpdatedUser,
    getPost,
    getComments,
}