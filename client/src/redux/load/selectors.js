const getActiveUserPosts = state => state.loadReducer.activeUserPosts;
const getActiveUser = state => state.loadReducer.activeUser;
const getUpdatedUser = state => state.loadReducer.updatedUser;

export default {
    getActiveUserPosts,
    getActiveUser,
    getUpdatedUser
}