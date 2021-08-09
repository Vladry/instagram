import {types} from './';

const initState = {
    activeUserPosts: [],
    activeUser: '',
    postsAreLoading: false,
    userIsLoading: false,
};

export default (state = initState, action) => {
    switch(action.type) {
        case types.LOAD_USER_POSTS:
            return {...state, activeUserPosts: action.payload};
        case types.LOAD_ACTIVE_USER:
            return {...state, activeUser: action.payload};
        case types.POSTS_ARE_LOADING:
            return {...state, postsAreLoading: action.payload};
            case types.USER_IS_LOADING:
            return {...state, userIsLoading: action.payload};

        default: return state;
    }
};

