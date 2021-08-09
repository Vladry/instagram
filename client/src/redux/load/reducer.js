import {types} from './';

const initState = {
    activeUserPosts: [],
    activeUser: '',
    isLoading: false
};

export default (state = initState, action) => {
    switch(action.type) {
        case types.LOAD_USER_POSTS:
            return {...state, activeUserPosts: action.payload};
        case types.LOAD_ACTIVE_USER:
            return {...state, activeUser: action.payload};
        case "IS_LOADING":
            return {...state, isLoading: action.payload};

        default: return state;
    }
};

