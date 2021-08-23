import {types} from './';

const defaultUser = {
    "avatarSrc": "https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg",
    "_id": "610d38873740f644cccc1cf1",
    "posts": [],
    "userNick": "Vlad",
    "__v": 0
};

const initState = {
    activeUserPosts: [],
    activeUser: defaultUser, //пока нет авторизации- это будет дефолтный юзер в системе
    postsAreLoading: false,
    userIsLoading: false,
    updatedUser: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_USER_POSTS:
            return {...state, activeUserPosts: action.payload};
        case types.LOAD_ACTIVE_USER:
            return {...state, activeUser: action.payload};
        case types.POSTS_ARE_LOADING:
            return {...state, postsAreLoading: action.payload};
        case types.USER_IS_LOADING:
            return {...state, userIsLoading: action.payload};
        case types.TOGGLE_CONTACT_STATUS:
            return {...state, updatedUser: action.payload};
        case types.GET_POST_COMMENTS_USER:
            return {
                ...state,
                aPost: action.payload[0],
                comments: action.payload[1],
                aUser: action.payload[2]
            };

        default:
            return state;
    }
};

