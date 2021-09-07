import {types} from './';

const fixedUser = {
    "avatarSrc": "https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg",
    "_id": "610d38873740f644cccc1cf1",
    "posts": [],
    "userNick": "Vlad",
    "__v": 0
};
const loggedUser = localStorage['activeUser'] ?
    JSON.parse(localStorage['activeUser']) : {};
const defaultUser = loggedUser.hasOwnProperty('avatarSrc') ? loggedUser
    : fixedUser;

const initState = {
    allUsersPosts: [],
    activeUser: defaultUser,
    currentUserPosts: [],
    currentUser: {},
    postsAreLoading: false,
    userIsLoading: false,
    updatedUser: {},
    modalIsOpen: false,
    newCommentObj: {},
    aPost: '',
    comments: '',
    aUser: '',
    changedPost: {},
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_ALL_USERS_POSTS:
            const newAllusersPosts = {...state};
            newAllusersPosts.allUsersPosts = [...newAllusersPosts.allUsersPosts, ...action.payload];
            return newAllusersPosts;

        case types.SET_ACTIVE_USER:
            localStorage['activeUser'] = JSON.stringify(action.payload);
            const newActiveUser = {...state};
            newActiveUser.activeUser = {...action.payload};
            newActiveUser.activeUser.userNick = action.payload.userNick;
            newActiveUser.activeUser.avatarSrc = action.payload.avatarSrc;
            newActiveUser.activeUser.addedByUsersID = action.payload.addedByUsersID;
            return newActiveUser;
        case types.LOAD_USER_POSTS:
            return {...state, currentUserPosts: action.payload};
        case types.LOAD_CURRENT_USER:
            return {...state, currentUser: action.payload};
        case types.POSTS_ARE_LOADING:
            return {...state, postsAreLoading: action.payload};
        case types.USER_IS_LOADING:
            return {...state, userIsLoading: action.payload};
        case types.TOGGLE_CONTACT_STATUS:
            const newUpdatedUser = {...state, updatedUser: action.payload};
            newUpdatedUser.updatedUser.addedByUsersID = action.payload.addedByUsersID;
            return newUpdatedUser;
        case types.GET_POST_COMMENTS_USER:
            const newPostCommentsAndUser = {...state};
            newPostCommentsAndUser.aPost = {...action.payload[0]};
            newPostCommentsAndUser.comments = [...action.payload[1]];
            newPostCommentsAndUser.aUser = {...action.payload[2]};
            return newPostCommentsAndUser;
        case types.CLOSE_MODAL:
            return {...state, modalIsOpen: false};
        case types.OPEN_MODAL:
            return {...state, modalIsOpen: true};
        case types.POST_NEW_COMMENT:
            const newComment = {...state};
            newComment.newCommentObj.commentedBy = action.payload.commentedBy;
            newComment.newCommentObj.postId = action.payload.postId;
            newComment.newCommentObj.date = action.payload.date;
            return newComment;
        case types.UPDATE_LIKE_STATUS:
            const post = action.payload;
            const updatedPost = {...state};
            const index = updatedPost.allUsersPosts.findIndex(aPost => aPost._id === post._id);
            updatedPost.allUsersPosts[index] = {...post};
            updatedPost.changedPost = {...post};
            return updatedPost;

        default:
            return state;
    }
};

