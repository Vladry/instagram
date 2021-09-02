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

console.log("defaultUser ", defaultUser);
const initState = {
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
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.SET_ACTIVE_USER:
            localStorage['activeUser'] = JSON.stringify(action.payload);
            return {...state, activeUser: action.payload};
        case types.LOAD_USER_POSTS:
            return {...state, currentUserPosts: action.payload};
        case types.LOAD_CURRENT_USER:
            return {...state, currentUser: action.payload};
        case types.POSTS_ARE_LOADING:
            return {...state, postsAreLoading: action.payload};
        case types.USER_IS_LOADING:
            return {...state, userIsLoading: action.payload};
        case types.TOGGLE_CONTACT_STATUS:
            console.log('updatedUser ', action.payload);
            return {...state, updatedUser: action.payload};
        case types.GET_POST_COMMENTS_USER:
            return {
                ...state,
                aPost: action.payload[0],
                comments: action.payload[1],
                aUser: action.payload[2]
            };
        case types.CLOSE_MODAL:
            return {...state, modalIsOpen: false};
        case types.OPEN_MODAL:
            return {...state, modalIsOpen: true};
        case types.POST_NEW_COMMENT:
            return {...state, newCommentObj: action.payload};

        default:
            return state;
    }
};

